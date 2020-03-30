const express = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").jwtsecretKey;
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const router = express.Router();

/**
 * @route    GET /api/users/test
 * @desc     Tests users route
 * @access   Public
 * */
router.get("/test", (req, res) => res.json({ msg: "Users work" }));

/**
 * @route    post /api/users/register
 * @desc     registers user
 * @access   Public
 * */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
  //first check for existing email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email cannot be used";
      res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log("new user registered");
              res.status(200).json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
/**
 * @route    post /api/users/login
 * @desc     login & returns token
 * @access   Public
 * */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      res.status(404).json(errors);
    } else {
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched

            //JWT Payload
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name
            };

            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.cookie("jwt", token, {
                httpOnly: true,
                sameSite: true,
                signed: true,
                secure: true
              });
              res.json({ success: true, token: "Bearer " + token });
            });
          } else {
            errors.password = "Password is incorrect";
            res.status(400).json(errors);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);
module.exports = router;
