import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

let composeEnhancers = null,
  store = null;

if (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === 'development'
) {
  composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose;
  store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk))
  );
} else {
  store = createStore(reducers, applyMiddleware(reduxThunk));
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
