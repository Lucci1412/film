import { Strategy as FacebookStrategy } from 'passport-facebook';
import passport from 'passport';
import User from '../model/User.js'



//facebook passport
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "api/v1/auth/facebook/callback"
}, function (req, accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // const defaultUser = {
    //     username: profile.displayName,
    //     email: profile.emails[0].value,
    //     avatar: profile.photos[0].value,
    //     facebookId: profile.id,
    // };
    User.findOne({
        where: { facebookId: profile.id },
    }, function (err, user) {
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
