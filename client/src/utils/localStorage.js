// Places
export const getSavedPlaceIds = () => {
  const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_places'))
    : [];

  return savedPlaceIds;
};

export const savePlaceIds = (placeIdArr) => {
  if (placeIdArr.length) {
    localStorage.setItem('saved_places', JSON.stringify(placeIdArr));
  } else {
    localStorage.removeItem('saved_places');
  }
};

export const removePlaceId = (place_id) => {
  const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_places'))
    : null;

  if (!savedPlaceIds) {
    return false;
  }

  const updatedSavedPlaceIds = savedPlaceIds?.filter((savedPlaceId) => savedPlaceId !== place_id);
  localStorage.setItem('saved_places', JSON.stringify(updatedSavedPlaceIds));

  return true;
};


// Expenses
export const getSavedExpensesId = () => {
  const savedExpensesId = localStorage.getItem('saved_expenses')
    ? JSON.parse(localStorage.getItem('saved_expenses'))
    : [];

  return savedExpensesId;
};

export const saveExpensesId = (expenseIdArr) => {
  if (expenseIdArr.length) {
    localStorage.setItem('saved_expenses', JSON.stringify(expenseIdArr));
  } else {
    localStorage.removeItem('saved_expenses');
  }
};

export const removeExpensesId = (expenseId) => {
  const savedExpensesIds = localStorage.getItem('saved_expenses')
    ? JSON.parse(localStorage.getItem('saved_expenses'))
    : null;

  if (!savedExpensesIds) {
    return false;
  }

  const updatedSavedExpensesIds = savedExpensesIds?.filter((savedExpensesId) => savedExpensesId !== expenseId);
  localStorage.setItem('saved_expenses', JSON.stringify(updatedSavedExpensesIds));

  return true;
};
