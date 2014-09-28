'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../secret');

function localAuth(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).send({ message: "Unknown error" });
        }

        if (!user) {
            return res.status(401).send({ message: info.message });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(401).send({
                    message: 'req.logIn() error: ' + err
                });
            }
            var token = jwt.sign(user, SERVER_SECRET, { expiresInMinutes: 60 * 5 });
            return res.json({ token: token });
        });
    })(req, res, next);
};

module.exports = function (app, passport) {
    app.post('/login', localAuth);
}

