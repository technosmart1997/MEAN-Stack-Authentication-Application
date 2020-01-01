const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");

router.post("/login", passport.authenticate("login"), authController.postLogin);

router.post("/signup", authController.postSignup);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: true }),
  authController.logout
);

module.exports = router;
