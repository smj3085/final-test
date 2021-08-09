import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ENTRY = gql`
  mutation addThought($entryText: String!, $thoughtAuthor: String!, $entryPlace: String!, $visitDate: String!) {
    addThought(entryText: $entryText, thoughtAuthor: $thoughtAuthor, entryPlace: $entryPlace, visitDate: $visitDate) {
      _id
      entryText
      visitDate
      entryPlace
      thoughtAuthor
      createdAt
    }
  }
`;

export const ADD_PLACE = gql`
mutation addPlace(
  $placeName: String!
  $placeAddress: String!
  $placeType: String!
  $rating: String!
) {
  addPlace(
    placeName: $placeName
    placeAddress: $placeAddress
    placeType: $placeType
    rating: $rating
  ) {
    rating
    createdAt
    place {
      placeName
      placeAddress
      placeType
    }
    user {
      _id
    }
  }
}
`;
