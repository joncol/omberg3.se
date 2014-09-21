'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);

