const { string } = require('joi');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating: Number,
    replies: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}
    ],
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Places'},
    likes: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;