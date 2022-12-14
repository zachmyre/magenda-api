const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };