import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import nycBreweries from './reducers/nycBreweries';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import 'semantic-ui-css/semantic.min.css';
require('dotenv').config();

const store = createStore(nycBreweries, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

