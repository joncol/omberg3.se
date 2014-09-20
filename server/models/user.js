mongoose = require('mongoose')
passportLocalMongoose = require('passport-local-mongoose')

userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

// User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)

