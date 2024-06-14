const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Places'},
    booker: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    checkin: {type: Date, required: true},
    guests: {type: Number, required: true},
    checkout: {type: Date, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true}
});


const Booking = mongoose.model('Bookings', BookingSchema);

module.exports = Booking;