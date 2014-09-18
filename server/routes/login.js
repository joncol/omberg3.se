module.exports = function (app, passport) {

    app.post('/login', function (req, res, next) {
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
                return res.end();
            });
        })(req, res, next);
    });
}
