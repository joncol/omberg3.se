'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
// var GoogleOauth2Strategy = require('passport-google-oauth').OAuth2Strategy;
var promise = require('bluebird');
var mongoose = require('mongoose');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var gcal = require("googleapis").calendar("v3");
var inspect = require('eyes').inspector({ maxLength: 16384 });

promise.promisifyAll(User);
promise.promisifyAll(User.prototype);

function serializeLocalUser(user, done) {
    done(null, {
        username: user.username,
        authType: user.authType,
        admin: true
    });
}

function authSerializer(user, done) {
    serializeLocalUser(user, done);
    // if (user.authType == 'local')
    //     serializeLocalUser(user, done);
}

function authDeserializer(user, done) {
    done(null, user);
}

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Ogiltigt användarnamn' });
        }

        if (!user.password || user.password === '') {
            // no password, assume admin user has just been created and set
            // new password
            user.password = password;
            user.saveAsync()
                .spread(function () {
                })
                .then(function () {
                    return done(null, false, { message: 'Satte nytt lösenord' });
                });
        } else {
            user.comparePasswordAsync(password)
                .then(function (isMatch) {
                    if (!isMatch) {
                        return done(null, false, { message: 'Ogiltigt lösenord' });
                    }
                    return done(null, {
                        username: user.username,
                        admin: true
                    });
                });
        }
    });
}));

passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:3000/auth/google/return',
  realm: 'http://localhost:3000'
}, function (identifier, profile, done) {
    // var cal = new gcal.GoogleCalendar(accessToken);
    inspect(profile);
    return done(null, profile);
}));

// passport.use('googleServiceAccount', new GoogleStrategy({
//   clientID: '213625281341-vpjfgovj55jslnl0ejnbmr3uekrmdl46.apps.googleusercontent.com',
//   clientSecret: 'XBz6Uyl0dCqVeidb6ut3l02c',
//   callbackURL: 'http://localhost:3000/auth/google/callbackAdmin',
//   scope: ['openid', 'https://www.googleapis.com/auth/calendar']
// }, function (accessToken, refreshToken, profile, done) {
//     // var cal = new gcal.GoogleCalendar(accessToken);
//     return done(null, {
//         username: "google",
//         admin: true
//     });
// }));

module.exports = function (app) {
    passport.serializeUser(authSerializer);
    passport.deserializeUser(authDeserializer);
    var db = process.env.OMBERG3_DB || 'omberg3';
    mongoose.connect('mongodb://localhost/' + db);

    require('./routes/login')(app, passport);
};

