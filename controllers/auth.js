const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Users = require("../models/user");

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.json({
        success: false,
        message: "User Already Register please Login"
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        const user = new User({
          email: email,
          password: hash
        });
        user
          .save()
          .then(result => {
            return res.json({
              success: true,
              message: "User Registered Successfully!!"
            });
          })
          .catch(err => {
            return res.json({ success: false, message: err });
          });
      });
    });
  });
};

exports.postLogin = (req, res, next) => {
  const userData = { id: req.user._id , email : req.user.email};
  const token = jwt.sign(userData, "My Secret", {
    expiresIn: 60 * 60 * 24 * 1000 // Expires in 24 hours.
  });
  req.session.save(err => {
    if (err) {
      console.log(err);
    }
    res.status(200).send({
      status: true,
      user: userData,
      token: token,
      message: "User Authenticated Successfully"
    });
  });
};

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "User Logout" });
    });
  }
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});
