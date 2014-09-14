module.exports = function (app, passport) {
    app.post('/login', function (req, res) {
        console.log('yo! POST /login');
        res.end('hi there');
        // res.send('welcome: ' + req.user.username);
    });

    // app.post('/login', passport.authenticate('local', {
    //     // successRedirect: '/',
    //     // failureRedirect: '/#/login_failed'
    //     // failureFlash: true
    // }), function (req, res) {
    //     res.send('welcome: ' + req.user.username);
    //     // res.render('/');
    // });

    // app.post("/login", passport.authenticate("localDB", {
    //     successRedirect: "/",
    //     failureRedirect: "/login",
    //     failureFlash: true
    // }), function (req, res) {
    //     // req.session.username = req.user.username;
    //     res.send("yolo bro");
    // });
}
