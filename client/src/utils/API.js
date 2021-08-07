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

// expenses
export const saveExpenses = (expenseData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
};

// remove saved book data for a logged in user
export const deleteExpense = (expenseId, token) => {
  return fetch(`/api/users/books/${expenseId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};



// Search google Places api
export const searchGooglePlaces = (query) =>  {
  const API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_PLACES;
  return fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=photos,formatted_address,types,name,rating,opening_hours,geometry&key=${API_KEY}`);
};
