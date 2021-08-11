const { Schema } = require('mongoose');

const placeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  place_id: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  wikipedia: {
    type: String,
  },
});


module.exports = placeSchema;
