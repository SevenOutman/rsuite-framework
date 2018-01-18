import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { config, initConfig } from './Config';
import { initIntl } from './Intl';
import Auth from './Auth';
import { initStore } from './Store';
import { initModel } from './ORM';
import View, { registerLayouts } from './View';
import { app, mods } from './App/functions';

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

  _mods = {};

  constructor(config) {
    instance = this;

    // 可以直接传入 config，也可以在子类中手动调 registerConfig
    config && this.registerConfig(config);
  }

  mod(name) {
    return this._mods[name];
  }

  register(key, value) {
    return Object.defineProperty(this._mods, key, {
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
      component: require('./View/components/App'),
    }, pages));
  }

  registerLocales(locales) {
    this.register('intl', initIntl(locales));
  }

  start(elOrSelector) {
    if (process.env.NODE_ENV === 'development') {
      console.log(mods());
    }

    // is selector
    if (typeof elOrSelector === 'string') {
      elOrSelector = document.querySelector(elOrSelector);
    }

    const reduxStore = app('store')._reduxStore;
    const history = syncHistoryWithStore(hashHistory, reduxStore);
    return ReactDOM.render((
      <Provider store={reduxStore}>
        <Router history={history} routes={app('routes')} />
      </Provider>
    ), elOrSelector);
  }
}

export default Application;
