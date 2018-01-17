import { toObjectLine } from '../utils';
import { dispatch } from '../Store';
import { CONFIG_INIT, CONFIG_UPDATE } from './reducer';
import { config as configSelector } from './selectors';
import { app } from '../App';

let _config = {};

function get(key) {
  const store = app('store');
  if (!store) {
    return _config[key];
  }
  return configSelector(store.getState())[key];
}

function set(key, value) {
  _config[key] = value;
  dispatch({
    type: CONFIG_UPDATE,
    values: { [key]: value },
  })
}

const Config = {
  get,
  set,
};

export default Config;

export function config(key, value) {
  if (void 0 !== value) {
    return set(key, value);
  }
  return get(key);
}

export function initConfig(values) {
  _config = toObjectLine(values);
  syncConfigToStore(values);
  return Config;
}

export function syncConfigToStore(values) {
  dispatch({
    type: CONFIG_INIT,
    values: values || _config,
  });
}