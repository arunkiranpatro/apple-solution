const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const mongoose = require("mongoose");
const User = require("../../models/User");

function getRecommendations(currentProfile, profiles) {
  const results = profiles.map(profile => {
    profile.score = 0;
    if (profile.gender !== currentProfile.gender) {
      profile.score += 50;
    }
    const profileAge = parseInt(profile.age);
    const currentProfileAge = parseInt(currentProfile.age);
    profile.score =
      profile.score + 0.3 * (100 - Math.abs(currentProfileAge - profileAge));
    let match = 0;
    for (const interest of profile.interests) {
      if (currentProfile.interests.includes(interest)) {
        match++;
      }
    }
    profile.score = profile.score + 0.2 * match;
    return profile;
  });
  return results.sort((p1, p2) => p2.score - p1.score);
}

/**
 * @route    GET /api/profile
 * @desc     Display own profile
 * @access   Private
 * */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const myProfilePromise = Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .exec();
    const allProfilePromises = Profile.find()
      .populate("user", ["name", "email"])
      .exec();
    Promise.all([myProfilePromise, allProfilePromises])
      .then(values => {
        let currentProfile = values[0];
        const recos = [];
        let allProfiles = values[1];
        if (!currentProfile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        if (allProfiles.length < 2) {
          return res.status(200).json(currentProfile);
        } else {
          const profilesExclCurr = allProfiles.filter(profile => {
            if (profile.user.email != currentProfile.user.email) {
              return true;
            }
          });
          const result = getRecommendations(currentProfile, profilesExclCurr);
          if (result[0]) {
            recos.push(result[0]);
            if (result[1]) recos.push(result[1]);
          }
          return res.status(200).json({ currentProfile, recos });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route    Post /api/profile
 * @desc     Create or update own profile
 * @access   Private
 * */

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.age) profileFields.age = req.body.age;

    // interests - Spilt into array
    if (typeof req.body.interests != "undefined") {
      profileFields.interests = req.body.interests.split(",");
    }

    // Create or Edit current user profile with unique handle
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          Profile.findOne({ handle: profileFields.handle }).then(p => {
            if (p) {
              errors.handle = "handle already exists";
              res.status(400).json(errors);
            }
          });
          new Profile(profileFields).save().then(profile => res.json(profile));
        } else {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
