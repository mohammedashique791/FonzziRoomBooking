const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    preferredname: String,
    email : {
        type: String,
        unique: true
    },
    profilepic: String,
    password: {type: String, required: true},
    favourites: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Places'}
    ],
    pan: {type: mongoose.Schema.Types.ObjectId, ref: 'Pan'},
    phone: String,
    secret: String,
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
