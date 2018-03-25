import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { compose } from 'redux';
import lifecycle from 'recompose/lifecycle';

import { login } from './actions';
import Routes from './routes';
import history from './history';
import store from './store';

require('./assets/scss/main.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>, document.getElementById('root')
);
