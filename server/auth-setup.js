'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var promise = require('bluebird');
var mongoose = require('mongoose');
var User = require("./models/user.js");
var jwt = require('jsonwebtoken');
var secret = require('./secret');

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
        if (err) { return done(err); }

        if (!user) {
            return done(null, false, { message: 'Ogiltigt användarnamn' });
        }

        if (user.password === '') {
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

module.exports = function (app) {
    passport.serializeUser(authSerializer);
    passport.deserializeUser(authDeserializer);
    app.use(passport.initialize());
    app.use(passport.session());
    mongoose.connect('mongodb://localhost/omberg3Users');

    require('./routes/login')(app, passport);
};

