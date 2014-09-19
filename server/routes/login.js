var authFunc = require('./auth-func');

module.exports = function (app, passport) {
    app.post('/login', authFunc);
}

