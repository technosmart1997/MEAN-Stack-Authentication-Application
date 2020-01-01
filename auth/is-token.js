exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ status: false, message: "Unauthorized" });
};
