const mongoose = require('mongoose');

// SCHEMA
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    password: {type: String, required: true, default: "the password of the user"},
    lastlogin: {type: Date, required: true, default: mongoose.now},//date time of most recent login
    friend:{type: [String],required: false},//id numbers of friends
    startdate: {type: Date, required: true}//user creation date
});

module.exports = mongoose.model('User', userSchema);