var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var mongoose = require('mongoose')
var User = require("./models/user.js")
var jwt = require('jsonwebtoken');
var secret = require('./secret')

function authSerializer(user, done) {
    serializeLocalUser(user, done);
    // if (user.authType == 'local')
    //     serializeLocalUser(user, done);
}

function serializeLocalUser(user, done) {
    done(null, {
        username: user.username,
        authType: user.authType,
        isAdmin: user.isAdmin
    });
}

function authDeserializer(user, done) {
    done(null, user);
}

passport.use(new LocalStrategy(function (username, password, done) {
    console.log('In local strategy callback');
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Ogiltigt användarnamn' });
        }

        if (user.password === '') {
            // no password, assume admin user has just been created and set
            // new password
            user.password = password;
            var token = jwt.sign(user, secret, { expiresInMinutes: 60 * 5 });
            return done(null, false, { message: 'Lösenord ej satt: ' + token });
        }

        if (user.password != password) {
            return done(null, false, { message: 'Ogiltigt lösenord' });
        }

        return done(null, {
            username: user.username,
            authType: 'local',
            isAdmin: true
        });
    });
}));

module.exports = function (app) {
    passport.serializeUser(authSerializer);
    passport.deserializeUser(authDeserializer);
    app.use(passport.initialize());
    app.use(passport.session());
    mongoose.connect('mongodb://localhost/omberg3Users');

    var login = require('./routes/login')(app, passport);
}

