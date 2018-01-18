import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Config, { config, initConfig } from './Config';
import Intl, { initIntl } from './Intl';
import Auth from './Auth';
import { initStore } from './Store';
import { initModel } from './ORM';
import { registerLayouts } from './View';
import View from './View';

let instance = null;

/**
 * @static getInstance()
 * @method register(key, options)
 * @method registerStore(reducers)
 * @method registerRoutes(pageRoutes)
 * @method registerLocales(locales)
 * @method registerLayouts(layouts)
 * @method start(elOrSelector)
 */
class Application {
  static getInstance() {
    return instance;
  }

  constructor(config) {
    instance = this;

    // 可以直接传入 config，也可以在子类中手动调 registerConfig
    config && this.registerConfig(config);
  }

  register(key, value) {
    return Object.defineProperty(this, key, {
      value,
      writable: false,
    });
  }

  registerConfig(config) {
    this.register('config', initConfig(config));
  }

  registerAuth() {
    this.register('auth', Auth);
  }

  registerModels(models) {
    Object.values(models).forEach((ModelClass) => {
      initModel(ModelClass);
    });
  }

  registerLayouts(layouts) {
    registerLayouts(layouts);
    this.registerView();
  }

  registerView() {
    this.register('view', View);
  }

  registerStore(reducers) {
    this.register('store', initStore(reducers));
  }

  registerRoutes(pages) {
    this.register('routes', Object.assign({}, {
      path: '/',
      component: require('./View/containers/Index').default,
    }, pages));
  }

  registerLocales(locales) {
    this.register('intl', initIntl(locales));
  }

  start(elOrSelector) {
    // is selector
    if (typeof elOrSelector === 'string') {
      elOrSelector = document.querySelector(elOrSelector);
    }

    const reduxStore = this.store._reduxStore;
    const history = syncHistoryWithStore(hashHistory, reduxStore);
    return ReactDOM.render((
      <Provider store={reduxStore}>
        <Router history={history} routes={this.routes} />
      </Provider>
    ), elOrSelector);
  }
}

export default Application;