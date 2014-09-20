var passport = require('passport')
var jwt = require('jsonwebtoken');
var secret = require('../secret')

module.exports = function (req, res, next) {
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
                    message: 'There was an error during req.logIn()'
                });
            }
            var token = jwt.sign(profile, secret, { expiresInMinutes: 60 * 5 });
            return res.json({ token: token });
        });
    })(req, res, next);
}

