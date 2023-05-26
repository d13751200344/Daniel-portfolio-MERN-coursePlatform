let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models").user;

// export passport module
module.exports = (passport) => {
  // https://www.npmjs.com/package/passport-jwt
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      //console.log(jwt_payload); // contains an object includes _id, email, and iat
      try {
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); // req.user <= foundUser
        }
        return done(null, false);
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
