const { AuthenticationError } = require('apollo-server-express');
const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('entries');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('entries');
    },
    entries: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Entry.find(params).sort({ createdAt: -1 });
    },
    entry: async (parent, { entryId }) => {
      return Entry.findOne({ _id: entryId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addEntry: async (parent, 
      { entryText, entryAuthor, entryPlace, createdDate, startDate, endDate  }) => {
      const entry = await Entry.create({ 
        entryText, 
        entryAuthor, 
        entryPlace, 
        createdDate, 
        startDate, 
        endDate  
      });

      await User.findOneAndUpdate(
        { username: entryAuthor },
        { $addToSet: { entries: entry._id } }
      );

      return entry;
    },

    removeEntry: async (parent, { entryId }) => {
      return Entry.findOneAndDelete({ _id: entryId });
    },

  },
};

module.exports = resolvers;
