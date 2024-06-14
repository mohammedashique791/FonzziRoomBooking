const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;