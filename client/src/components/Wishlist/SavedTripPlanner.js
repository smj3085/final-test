import React, { useState, useEffect } from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deletePlace } from '../../utils/API';
import Auth from '../../utils/auth';
import { removePlaceId } from '../../utils/localStorage';

const SavedPlaces = () => {
  const [userData, setUserData] = useState({});

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the place's mongo _id value as param and deletes the place from the database
  const handleDeletePlace = async (place_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deletePlace(place_id, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove place's id from localStorage
      removePlaceId(place_id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>No entries saved</h2>;
  }

  return (
    <>
      <Container fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved places!</h1>
        </Container>
      </Container>
      <Container>
        <h2>
          {userData.savedPlaces.length
            ? `Viewing ${userData.savedPlaces.length} saved ${userData.savedPlaces.length === 1 ? 'place' : 'places'}:`
            : 'You have no saved places!'}
        </h2>
        <CardColumns>
          {userData.savedPlaces.map((place) => {
            return (
              <Card key={place.place_id} border='dark'>
                {place.photo ? <Card.Img src={place.photo} alt={`The photo for ${place.photo}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <Card.Text>{place.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePlace(place.place_id)}>
                    Delete this place!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPlaces;
