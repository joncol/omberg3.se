module.exports = function (app, passport) {
    // app.post('/login', function (req, res) {
    //     console.log('yo! POST /login');
    //     console.log('req.param.username: ' + req.param('username', null));
    //     res.end('hi there');
    //     // res.send('welcome: ' + req.user.username);
    // });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '#/views/bokning'
    }), function (req, res) {
        console.log('In the callback');
        console.log('  req.user.username: ' + req.user.username);
        res.send('welcome: ' + req.user.username);
        // res.render('/');
    });

    // app.post("/login", passport.authenticate("localDB", {
    //     successRedirect: "/",
    //     failureRedirect: "/login",
    //     failureFlash: true
    // }), function (req, res) {
    //     // req.session.username = req.user.username;
    //     res.send("yolo bro");
    // });
}
