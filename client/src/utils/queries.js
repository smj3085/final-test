import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      placeCount
      savedPlaces {
        place_id
        name
        photo
        description
        wikipedia
      }
      thoughts {
        _id
        entryText
        thoughtPlace
        visitDate
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ENTRIES = gql`
  {
    thoughts {
      _id
      entryText
      thoughtPlace
      visitDate
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      entryText
      visitDate
      thoughtPlace
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;
