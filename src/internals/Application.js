import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { connect } from './Store';

let instance = null;

class Application {
  static getInstance() {
    return instance;
  }

  constructor({ config, reducers, routes, locales }) {
    this._store = connect({
      store: reducers,
      routing: routerReducer,
    })
    this.routes(routes);

    instance = this;
  }

  routes(routes) {
    this._pages = routes;
  }

  makeRoutes() {
    return Object.assign({}, {
      path: '/',
      // 异步请求的路由如果不加 default 会报错: The root route must render a single element
      // http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react
      component: require('./containers/Index').default,
    }, this._pages);
  }

  start(elOrSelector) {
    // is selector
    if (typeof elOrSelector === 'string') {
      elOrSelector = document.querySelector(elOrSelector);
    }

    const history = syncHistoryWithStore(hashHistory, this._store);

    return ReactDOM.render((
      <Provider store={this._store}>
        <Router history={history} routes={this.makeRoutes()} />
      </Provider>
    ), elOrSelector);
  }
}

export default Application;