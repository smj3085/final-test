import React from 'react';
import { useQuery } from '@apollo/client';

import EntryList from '../components/EntryList';
import EntryForm from '../components/EntryForm';

import { QUERY_THOUGHTS } from '../utils/queries';
import { Segment } from 'semantic-ui-react';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <Segment>
      <div>
        
          <EntryForm />
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EntryList
              thoughts={thoughts}
              title="Your previous entries!"
            />
            
          )}
        </div>
    </Segment>
  );
};

export default Home;
