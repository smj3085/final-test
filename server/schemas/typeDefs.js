const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    entries: [Entry]
    place: [Place]
  }

  type Entry {
    _id: ID
    entryText: String
    entryPlace: String
    entryAuthor: String
    startDate: String
    endDate: String
  }

  type Place {
    place_id: ID
    name: String
    type: String
    address: String
    rating: String
    photo: String

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
    places(username: String!): [Place]
    place(placeID: ID!): Place
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEntry(entryText: String!, entryAuthor: String!, entryPlace: String, startDate: String, endDate: String): Entry
    removeEntry(entryID: ID!): Entry
  }
`;

module.exports = typeDefs;
