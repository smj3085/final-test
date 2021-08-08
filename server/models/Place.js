const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const placeSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  address: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user:
  {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});


module.exports = placeSchema;
