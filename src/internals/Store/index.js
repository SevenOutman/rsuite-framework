import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from '../Auth/reducer';

const middlewares = [thunkMiddleware];
/** redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

export function connect(reducers = {}) {
  return store = createStore(
    combineReducers({
      framework: combineReducers({
        auth: authReducer
      }),
      ...reducers,
    }), composeEnhancers(applyMiddleware(...middlewares)),
  );
}

export function getState() {
  return store ? store.getState() : {};
}

export function dispatch(...args) {
  store && store.dispatch(...args);
}
