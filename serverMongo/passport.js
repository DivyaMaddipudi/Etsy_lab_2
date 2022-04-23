const passport = require("passport");
const JwtStrategy = require("passport-local");
const { ExtractJwt } = require("passport-jwt");
const Users = require("./models/model");

function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("JWT"),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload._id;
      Users.findById(user_id, (err, results) => {
        if (err) {
          console.log("Error, Invalid user");
          return callback(err, false);
        }
        if (results) {
          console.log("No error, valid user");
          callback(null, results);
        } else {
          console.log("No error, Invalid user");
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
// exports.checkAuth = passport.authenticate("JWT", { session: false });
