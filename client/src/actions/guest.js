import client from './client';
import { ADD_URL, ERROR_URL, FETCH_URL } from './guestTypes';

export const createShortURL = url => async dispatch => {
  await client
    .post('/url', {
      ...url
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: ADD_URL, payload: res.data });
      } else {
        dispatch(urlFail(res.data.error));
      }
    });
};

export const fetchURL = (url, getInfo) => async dispatch => {
  await client.get(`/url/${url}?info=${getInfo}`).then(res => {
    if (res.status === 200) {
      dispatch({ type: FETCH_URL, payload: res.data });
    } else {
      dispatch(urlFail(res.data.error));
    }
  });
};

export const urlFail = error => {
  if (error === undefined) {
    error = 'An Unknown Error Occured';
  }
  return {
    type: ERROR_URL,
    payload: { error }
  };
};
