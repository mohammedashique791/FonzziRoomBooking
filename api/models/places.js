const { number, string } = require('joi');
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    location: String,
    title: String,
    price: Number,
    address: String,
    photos: [String],
    perks: [String],
    extraInfo: String,
    rating: Number,
    description: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    review: [
        {
        type: mongoose.Schema.Types.ObjectId, ref: 'Review'
    }
],
});

const Places = mongoose.model('Places', placeSchema);
module.exports = Places;