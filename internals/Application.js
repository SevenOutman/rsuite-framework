import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Config from './Config';
import Intl from './Intl';
import authReducer from './Auth/reducer';
import configReducer from './Config/reducer';

const middlewares = [thunkMiddleware];
/** redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let instance = null;

/**
 * @static getInstance()
 * @method register(key, options)
 * @method registerStore(reducers)
 * @method registerRoutes(pageRoutes)
 * @method registerLocales(locales)
 * @method start(elOrSelector)
 */
class Application {
  static getInstance() {
    return instance;
  }

  _config = {};

  constructor(config) {
    instance = this;

    this.loadConfig(config);
  }

  loadConfig(config) {
    // registerConfig after registerStore
    this._config = config;
  }

  register(key, value) {
    return Object.defineProperty(this, key, {
      value,
      writable: false,
    });
  }

  registerConfig() {
    this.register('config', Config(this._config));
  }

  registerStore(reducers) {
    this.register('store', createStore(
      combineReducers({
        framework: combineReducers({
          auth: authReducer,
          config: configReducer
        }),
        store: reducers,
        routing: routerReducer,
      }), composeEnhancers(applyMiddleware(...middlewares)),
    ));
    this.registerConfig();
  }

  registerRoutes(pages) {
    this.register('routes', Object.assign({}, {
      path: '/',
      component: require('./containers/Index').default,
    }, pages));
  }

  registerLocales(locales) {
    this.register('locales', Intl(locales));
  }

  start(elOrSelector) {
    // is selector
    if (typeof elOrSelector === 'string') {
      elOrSelector = document.querySelector(elOrSelector);
    }

    const store = this.store
    const history = syncHistoryWithStore(hashHistory, store);

    return ReactDOM.render((
      <Provider store={store}>
        <Router history={history} routes={this.routes} />
      </Provider>
    ), elOrSelector);
  }
}

export default Application;