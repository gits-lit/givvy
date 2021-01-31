import {RANK_SHELTERS, GET_SHELTERS} from './types';

export const rankShelters = (items) => async dispatch => {
  console.log('RANKING SHELTERS');
  console.log(items);
  const response = await fetch('https://givvy-api.herokuapp.com/api/shelter/rankShelters', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      donations: items
    }),
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  dispatch({
    type: RANK_SHELTERS,
    payload: data
  });
}

export const getShelters = (items) => async dispatch => {
  console.log('GETTING SHELTERS');
  const response = await fetch('https://givvy-api.herokuapp.com/api/shelter/getShelters', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  const reformattedData = {}
  for(let i = 0; i < data.length; i++) {
    const object = data[i]
    reformattedData[object.name] = {
      address: object.address,
      category: object.category,
      donations: object.donations,
      lat: object.lat,
      long: object.long,
      type: object.type
    }
  }
  dispatch({
    type: GET_SHELTERS,
    payload: reformattedData
  });
}

export const donateItems = (shelter, items) => async dispatch => {
  const modifiedItems = []
  for (let i = 0; i < items.length; i++ ) {
    modifiedItems.push(items[i][0], items[i][1]); 
  }
  console.log(shelter);
  console.log(modifiedItems);
  const response = await fetch('https://givvy-api.herokuapp.com/api/item/donateItems', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shelter: shelter,
      donations: modifiedItems
    }),
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  getShelters();
}