import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import EntryList from '../components/Dashboard/EntryList';

import { Segment, Header, Container } from 'semantic-ui-react';
import { FaSuitcaseRolling } from 'react-icons/fa';

import { QUERY_ENTRIES } from '../utils/queries';

// import {RiUserLocationLine} from 'react-icons/ri';

const Dashboard = () => {
  const { data } = useQuery(QUERY_ENTRIES);
  const entries = data?.entries || [];


    return (
        <>
        <Segment className='dashboard' style={{padding:'50px'}}>
            <Link to ='/addnew' className='btn btn-warning'> <FaSuitcaseRolling />New Entry</Link>

            <Header as='h1'>Map</Header>
            <p>Where have you been!</p>
            <Container className='dashboardImg'>Map photo</Container>
            <Header as='h1'>Previous entries</Header>
            <EntryList
              entries={entries}
              title="Your Entries!" />
           
        </Segment>
        </>
    );
};

export default Dashboard;