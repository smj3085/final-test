import gql from 'graphql-tag';

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
        entryPlace
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
      entryPlace
      visitDate
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($entryId: ID!) {
    thought(entryId: $entryId) {
      _id
      entryText
      visitDate
      entryPlace
      thoughtAuthor
      createdAt
    }
  }
`;

// export const QUERY_SEARCH = gql`
//   query placeSearch($placeName: String, $placeType: String, $address: String, $rating: String) {
//     placeSearch(placeName: $placeName, placeType: $placeType, rating: $rating) {
//       rating
//       place {
//         placeName
//         placeAddress
//         placeType
//         _id
//         review {
//           rating
//         }
//       }
//       user {
//         username
//         email
//       }
//     }
//   }
//   `
