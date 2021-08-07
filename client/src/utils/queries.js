import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      entries {
        _id
        entryText
        entryAuthor
        entryPlace
        createdAt
        startDate
        endDate
      }
    }
  }
`;

export const QUERY_ENTRIES = gql`
  query getEntries {
    entries {
      _id
      entryText
      entryAuthor
      entryPlace
      createdAt
      startDate
      endDate
    }
  }
`;

export const QUERY_SINGLE_ENTRY = gql`
  query getSingleEntry($entryId: ID!) {
    entry(entryId: $entryId) {
      __id
      entryText
      entryAuthor
      entryPlace
      createdAt
      startDate
      endDate
      }
    }
  }
`;
