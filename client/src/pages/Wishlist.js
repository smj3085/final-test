import React from 'react';
import { Segment } from 'semantic-ui-react';


import SearchPlaces from '../components/Wishlist/SearchTripPlanner';
import SavedPlaces from '../components/Wishlist/SavedTripPlanner';

const TripPlanner = () => {
    return (
        <>
    
        <Segment className='tripPlanner' style={{padding:'50px'}}>
            <SearchPlaces />
            <SavedPlaces />
        </Segment>
        </>
    );
};

export default TripPlanner;