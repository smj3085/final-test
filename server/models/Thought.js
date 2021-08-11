const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
  entryText: {
    type: String,
    required: 'You need to leave a thought!',

    trim: true,
  },
  thoughtPlace: {
    type: String,
    required: true,
    trim: true,
  },
  visitDate: {
    type: String,
    required: true,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
