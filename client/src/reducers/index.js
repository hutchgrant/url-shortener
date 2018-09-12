import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import guestReducer from './guestReducer';

export default combineReducers({
  form: reduxForm,
  guest: guestReducer
});
