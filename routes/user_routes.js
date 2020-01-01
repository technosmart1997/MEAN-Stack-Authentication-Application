const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const isToken = require("../auth/is-token");

router.get(
  "/profile",
  isToken.isAuthenticated,
  passport.authenticate("jwt", { session: true }),
  userController.getProfile
);

router.post("/create-task/:id",isToken.isAuthenticated,
passport.authenticate("jwt", { session: true }),userController.createTask);


router.delete("/delete-task/:id",isToken.isAuthenticated,
passport.authenticate("jwt", { session: true }),userController.deleteTask);


router.get('/get-tasks/:id' , isToken.isAuthenticated,
passport.authenticate("jwt", { session: true }),userController.getTask);

router.get('/get-task/:id' , isToken.isAuthenticated,
passport.authenticate("jwt", { session: true }),userController.getSingleTask);


module.exports = router;
