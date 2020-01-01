const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const Users = require("../models/user");

module.exports = passport => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        Users.findOne({
          email
        }).then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered"
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        });
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: "My Secret"
  };

  passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
      Users.findById(jwt_payload.id, { password: 0 }).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
