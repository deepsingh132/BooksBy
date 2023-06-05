const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const GoogleUser = require("../models/GoogleUser");
const User = require("../models/User");
const createJWT = require('./createJWT');

const generateUsername = (name) => {
  const seconds = Math.floor(Date.now() / 1000).toString();
  const firstTwoDigits = seconds.slice(-2);
  const lastTwoDigits = Math.floor(10 + Math.random() * 90);
  const username = `${name.replace(
    /\s+/g,
    ""
  )}#${firstTwoDigits}${lastTwoDigits}`;
  return username;
};


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user with Google ID already exists in database
          let googleUser = await GoogleUser.findOne({ profileId: profile.id });
          if (!googleUser) {
            // If user does not exist, create new user
            googleUser = new GoogleUser({
              profileId: profile.id,
              email: profile.emails[0].value,
              username: generateUsername(profile.displayName),
              name: profile.displayName,
              img: profile.photos[0].value,
            });
            await googleUser.save();

            const { profileId, ...others } = googleUser._doc;
            const token = createJWT(others);
            return done(null, { token: token, user: { ...others } });
          }
          // If user already exists, return user object
          const { profileId, ...others } = googleUser._doc;
          const token = createJWT(others);
          return done(null, { token: token, user: { ...others } });
        } catch (error) {
          return done(error, null);
        }
      }
    )
);

passport.serializeUser((user, done) => {
  //done(null, user.id);
  done(null, user);
})

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false, { message: "Server Error" });
        });
    })
  );
};
