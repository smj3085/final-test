const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    entries: [Entry]!
  }

  type Entry {
    _id: ID
    entryText: String
    entryAuthor: String
    startDate: String
    endDate: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    entries(username: String): [Entry]
    entry(entryID: ID!): Entry
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEntry(entryText: String!, entryAuthor: String!): Entry
    removeEntry(entryID: ID!): Entry
  }
`;

module.exports = typeDefs;
