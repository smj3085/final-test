import React, { useState, useEffect } from 'react';
// import { Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { getNearbyPlaces, savePlace, searchLocation, getPlaceInfo } from '../../utils/API';
import { savePlaceIds, getSavedPlaceIds } from '../../utils/localStorage';

import {Segment, Form, Card, Button, Header, Grid, Image } from 'semantic-ui-react';


const SearchPlaces = () => {
  // create state for holding returned google api data

  const [searchedPlaces, setSearchedPlaces] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved placeId values
  const [savedPlaceIds, setSavedPlaceIds] = useState(getSavedPlaceIds());

  // set up useEffect hook to save `savedPlaceIds` list to localStorage on component unmount
  useEffect(() => {
    return () => savePlaceIds(savedPlaceIds);
  });

  // create method to search for places and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchLocation(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const locationData = await response.json();
      const nearbyResponse = await getNearbyPlaces(locationData.lon, locationData.lat);
      const nearbyData = await nearbyResponse.json();
      const data = nearbyData.features.filter((feature, index) => index < 6);

      const placesDataPromise = await Promise.all(data.map(async (place) => {
        const placeResponse = await getPlaceInfo(place.properties.xid);
        const placeData = await placeResponse.json();
        return placeData
      }));
      const placesData = placesDataPromise.map((placeData) => {
        return {
          place_id: placeData.name,
          name: placeData.name,
          photo: placeData.preview?.source || 'https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png',
          description: placeData?.wikipedia_extracts?.text || '',
          wikipedia: placeData.wikipedia,
        }
      });


      setSearchedPlaces(placesData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a place to our database
  const handleSavePlace = async (place_id) => {
    // find the place in `searchedPlaces` state by the matching id
    const placeToSave = searchedPlaces.find((place) => place.place_id === place_id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await savePlace(placeToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if place successfully saves to user's account, save place id to state
      setSavedPlaceIds([...savedPlaceIds, placeToSave.place_id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    
      <Segment fluid className='text-dark'>
        <Header>Search for a place!</Header>
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <input 
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              size='lg'
              placeholder='Search for a place of interest'
             />
          </Form.Field>
          <Button type='submit' color='teal'>Search!</Button>
        </Form>
      </Segment>

      <Segment>
        <Grid>
          {searchedPlaces.map((place) => {
            return (
              <Card key={place.place_id}>
                <Card.Content>
                {place.photo ? (
                  <Image src={place.photo} alt={`The cover for ${place.name}`} variant='top' />
                ) : null}
                  <Card.Header>{place.name}</Card.Header>
                  <Card.Meta></Card.Meta>
                  <Card.Description>{place.description}</Card.Description>
                  <div>
                    <Button color='teal' onClick={`(${place.wikipedia})`}>Wikipedia</Button>
                    <br />
                  {Auth.loggedIn() && (
                    <Button color='yellow'
                      disabled={savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.place_id)}
                      onClick={() => handleSavePlace(place.place_id)}>
                      {savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.place_id)
                        ? 'This place has already been saved!'
                        : 'Save this place!'}
                    </Button>
                  )}
                   </div>
                </Card.Content>
              </Card>
            );
          })}
        </Grid>
      </Segment>
    </>
  );
};

export default SearchPlaces;
