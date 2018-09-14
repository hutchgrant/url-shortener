import client from './client';
import { ADD_URL, ERROR_URL, FETCH_URL, FETCH_VIEWERS } from './guestTypes';

export const createShortURL = url => async dispatch => {
  await client
    .post('/url', {
      ...url
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: ADD_URL, payload: res.data });
      }
    })
    .catch(err => {
      dispatch(urlFail(err.response.data.error));
    });
};

export const fetchURL = (url, getInfo) => async dispatch => {
  await client
    .get(`/url/${url}?info=${getInfo}`)
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: FETCH_URL, payload: res.data });
      }
    })
    .catch(err => {
      dispatch(urlFail(err.response.data.error));
    });
};

export const fetchViewers = (
  url,
  page,
  max,
  sort,
  direction,
  search
) => async dispatch => {
  await client
    .get(
      `/url/viewers/${url}?page=` +
        page +
        '&max=' +
        max +
        '&sort=' +
        sort +
        '&direction=' +
        direction +
        '&search=' +
        search
    )
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: FETCH_VIEWERS, payload: res.data });
      }
    })
    .catch(err => {
      dispatch(urlFail(err.response.data.error));
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
