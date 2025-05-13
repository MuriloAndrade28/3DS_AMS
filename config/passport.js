const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match User
      User.findOne({ where: { username: username } })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Usuário não encontrado" });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong password" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
