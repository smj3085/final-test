import React, { useState }  from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// import {RiUserLocationLine} from 'react-icons/ri';

const Dashboard = () => {

    return (
        <>
        <Segment className='dashboard' style={{padding:'50px'}}>
            <Link to ='/addnew' className='btn btn-warning'> <FaSuitcaseRolling />New Entry</Link>

            <Header as='h1'>Map</Header>
            <p>Where have you been!</p>
            <Header as='h1'>Previous entries</Header>
            {/* Entry list */}

            
           
        </Segment>
        </>
    );
};

export default Dashboard;