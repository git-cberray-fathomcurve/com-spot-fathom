const mongoose = require('mongoose');

// SCHEMA
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    owner: {type: String, required: false, default: "the name of the process owner"},
    startdate: {type: Date, required: false}
});

module.exports = mongoose.model('User', userSchema);