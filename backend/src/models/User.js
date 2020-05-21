const mongoose = require('mongoose');

const UserSchema = new mongooose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);