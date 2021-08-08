import React, { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { savePlace, searchGooglePlaces } from '../../utils/API';
import { savePlaceIds, getSavedPlaceIds } from '../../utils/localStorage';

// const API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_PLACES;

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

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGooglePlaces(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const jsonData = await response.json();
      console.log(jsonData)


      const data = jsonData.candidates;

      const placeData = data.map((place) => ({
        placeId: place.place_id,
        name: place.name, 
        type: place.types,
        address: place.formatted_address,
        rating: place.rating,
        photo: place.photos.photo_reference || '',
      }));

      setSearchedPlaces(placeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a place to our database
  const handleSavePlace = async (placeId) => {
    // find the place in `searchedPlaces` state by the matching id
    const placeToSave = searchedPlaces.find((place) => place.placeId === placeId);

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
      setSavedPlaceIds([...savedPlaceIds, placeToSave.placeId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className='text-dark'>
        <Container>
          <h1>Search for Places!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a place of interest'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Container>

      <Container>
        <h2>
          {searchedPlaces.length
            ? `Viewing ${searchedPlaces.length} results:`
            : 'Search for a place to begin'}
        </h2>
        <CardColumns>
          {searchedPlaces.map((place) => {
            return (
              <Card key={place.place_id} border='dark'>
                {place.photo ? (
                  <Card.Img src={place.photo} alt={`The cover for ${place.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <p className='small'>Category: {place.type}</p>
                  <Card.Text>{place.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.place_id)}
                      className='btn-block btn-info'
                      onClick={() => handleSavePlace(place.place_id)}>
                      {savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.placeId)
                        ? 'This place has already been saved!'
                        : 'Save this Place!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPlaces;
