const mongoose = require('mongoose');
const User = require('./user.js');

// SCHEMA
const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    name: {type: String, required: true},
    spot: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: false
        },
        //Note that coordinates must be longitude first (I don't know why it is that way!)
        coordinates: {
          type: [Number],
          required: false,
          default: [-122,40]
        }
      },
    //here we'd add field for users to share the location with
    friend: {type: String, required: false},
    note: {type: [String], required: false}
});

const pointSchema = mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

module.exports = mongoose.model('Location', locationSchema);