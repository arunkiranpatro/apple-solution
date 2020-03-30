const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cookieParser = require("cookie-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

const app = express();

const port = require("./config/keys").port;

//Use cookie parser
app.use(cookieParser("secret"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
