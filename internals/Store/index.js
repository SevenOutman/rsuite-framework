import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import configReducer from '../Config/reducer';
import { routerReducer } from 'react-router-redux';
import authReducer from '../Auth/reducer';
import { config, syncConfigToStore } from '../Config';
import thunkMiddleware from 'redux-thunk';

let _reduxStore = null;

export const getState = function getStateDelegate() {
  return _reduxStore ? _reduxStore.getState() : {};
};

export const dispatch = function dispatchDelegate(...args) {
  _reduxStore && _reduxStore.dispatch(...args);
};

const Store = {
  getState,
  dispatch,
  get _reduxStore() {
    return _reduxStore;
  },
};

export default Store;


const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {

  const logger = require('redux-logger').default;
  middlewares.push(logger);
}

/** redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function initStore(reducers) {
  _reduxStore = createStore(
    combineReducers({
      framework: combineReducers({
        auth: authReducer,
        config: configReducer,
      }),
      [config('store.namespace')]: reducers,
      routing: routerReducer,
    }), composeEnhancers(applyMiddleware(...middlewares)),
  );
  syncConfigToStore();
  return Store;
}