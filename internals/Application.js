import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { app } from './app';

let instance = null;

/**
 * @static getInstance()
 * @method register(key, options)
 * @method start(elOrSelector)
 */
class Application {
  static getInstance() {
    return instance;
  }

  constructor() {
    instance = this;
  }

  register(key, value) {
    return Object.defineProperty(this, key, {
      value,
      writable: false,
    });
  }

  start(elOrSelector) {
    // is selector
    if (typeof elOrSelector === 'string') {
      elOrSelector = document.querySelector(elOrSelector);
    }

    const store = app('store');
    const history = syncHistoryWithStore(hashHistory, store);

    return ReactDOM.render((
      <Provider store={store}>
        <Router history={history} routes={app('routes')} />
      </Provider>
    ), elOrSelector);
  }
}

export default Application;