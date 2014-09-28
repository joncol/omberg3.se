'use strict';

module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log('User is not authenticated, redirecting to /');
    res.redirect('/auth/google');
}

