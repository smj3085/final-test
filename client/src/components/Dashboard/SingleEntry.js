import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_ENTRY } from '../utils/queries';

const SingleEntry = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { entryId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ENTRY, {
    // pass URL parameter
    variables: { entryId: entryId },
  });

  const entry = data?.entry || {};

  if (loading) {
    return <div>Your memories</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {entry.title} <br />
        <span style={{ fontSize: '1rem' }}>
          was here {entry.startDate} to {entry.endDate}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {entry.entryText}
        </blockquote>
      </div>

     
    </div>
  );
};

export default SingleEntry;
