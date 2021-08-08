require('dotenv').config();
 
// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// Places
export const savePlace = (placeData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeData),
  });
};

// remove saved book data for a logged in user
export const deletePlace = (place_id, token) => {
  return fetch(`/api/users/books/${place_id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};



export const OPEN_TRIP_MAP_API_KEY = '5ae2e3f221c38a28845f05b6cb924c4cb6d3d351c88b787c265e7507';
// export const OPEN_TRIP_MAP_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export const searchLocation = (query) => {
  return fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${query}&apikey=${OPEN_TRIP_MAP_API_KEY}`)
};

export const getNearbyPlaces = (long, lat) => {
  return fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${long}&lat=${lat}&apikey=${OPEN_TRIP_MAP_API_KEY}`);
};

export const getPlaceInfo = (xid) => {
  return fetch(`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${OPEN_TRIP_MAP_API_KEY}`)
};