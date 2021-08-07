const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const entrySchema = new Schema({
  entryText: {
    type: String,
    required: 'You need to leave a description!',
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  entryAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  entryPlace: {
    type: String, 
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
  
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
