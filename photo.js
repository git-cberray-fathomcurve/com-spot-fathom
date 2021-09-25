const mongoose = require('mongoose');
const Location = require('./location.js');

// this schema is used for prep of image/file upload to mongo (<16mb)
const photoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: false},
    name: {type: String, required: true},
    Image : {
        type : String,
        required: false
    }
});

module.exports = mongoose.model('Photo', photoSchema);