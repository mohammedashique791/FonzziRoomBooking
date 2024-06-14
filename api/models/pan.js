const mongoose = require('mongoose');

const PanSchema = new mongoose.Schema({
    Uid: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


const Pan = mongoose.model('Pan', PanSchema);
module.exports = Pan;