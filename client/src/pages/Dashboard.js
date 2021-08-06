import React, { useState }  from 'react';
import { Segment, Header, Button, Container, Modal } from 'semantic-ui-react';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// import {RiUserLocationLine} from 'react-icons/ri';

const Dashboard = () => {

    return (
        <>
        <Segment className='dashboard'>
            <Link to ='/addnew' className='btn btn-warning'> <FaSuitcaseRolling />New Entry</Link>
            <Container>

            <Header as='h1'>Map</Header>
            </Container>
            <Container>
            <Header as='h1'>Previous entries</Header>
            {/* Entry list */}


            </Container>

            
           
        </Segment>
        </>
    );
};

export default Dashboard;