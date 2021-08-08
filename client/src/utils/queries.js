import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        entryText
        visitDate
        thoughtPlace
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
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

export const QUERY_SEARCH = gql`
  query placeSearch($placenName: String, $placeType: String, $address: String, $rating: String) {
    placeSearch(placeName: $placeName, placeType: $placeType, rating: $rating) {
      rating
      place {
        placeName
        placeAddress
        placeType
        _id
        review {
          rating
        }
      }
      user {
        username
        email
      }
    }
  }
  `
