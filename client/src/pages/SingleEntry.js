import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {Header, Segment, Button, Message } from 'semantic-ui-react';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Segment>
      <Header as='h1'>{thought.thoughtPlace}</Header>
      <p>Visited on {thought.visitDate}</p>
      <Message>
        {thought.entryText}
      </Message>

      <Button type='submit' color='teal'>Edit post</Button>
    </Segment>
  );
};

export default SingleThought;
