const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'} 
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;