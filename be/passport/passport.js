import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../model/User.js'
//google passport 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "api/v1/auth/google/callback"
}, function (req, accessToken, refreshToken, profile, cb) {
    const defaultUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        googleId: profile.id,
    };
    console.log(profile.id)
    User.findOne({googleId: profile.id}, function (err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            user = new User(defaultUser)
            user.save(function (err) {
                if (err) console.log(err);
                return cb(err, user);
            });
        } else {
            return cb(err, user);
        }
    });
}
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
