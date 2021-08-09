const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    entryText: String
    thoughtPlace: String
    visitDate: String
    thoughtAuthor: String
    createdAt: String
  }

  type Place {
    place_id: ID!
    name: String
    photo: String
    description: String
    wikipedia: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(entryText: String!, thoughtPlace: String!, visitDate: String!, thoughtAuthor: String!): Thought
    removeThought(thoughtId: ID!): Thought
    savePlace(input: placeInput!): User
    removePlace(place_id!): User
  }
`;

module.exports = typeDefs;
