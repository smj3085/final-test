import React from 'react';
import { Segment } from 'semantic-ui-react';


import SearchPlaces from '../components/Wishlist/SearchWishlist';
import SavedPlaces from '../components/Wishlist/SavedWishlist';

const Wishlist = () => {
    return (
        <>
    
        <Segment className='wishlist' style={{padding:'50px'}}>
            <SearchPlaces />
            <SavedPlaces />
        </Segment>
        </>
    );
};

export default Wishlist;