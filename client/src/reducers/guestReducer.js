import {
  ADD_URL,
  ERROR_URL,
  FETCH_URL,
  FETCH_VIEWERS
} from '../actions/guestTypes';

export default function(state = null, { type, payload }) {
  let urls = [];
  switch (type) {
    case ADD_URL:
      if (state && state.urls) {
        Object.assign(urls, state.urls);
      }
      urls.unshift({ ...payload });
      return { ...state, urls };
    case FETCH_URL:
      return { ...state, ...payload };
    case FETCH_VIEWERS:
      return { ...state, ...payload };
    case ERROR_URL:
      return { ...state, ...payload };
    default:
      return state;
  }
}
