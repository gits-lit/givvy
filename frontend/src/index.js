import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './style.scss';

import configureStore, { history } from './store';

// Pages
import HomePage from './containers/HomePage';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);