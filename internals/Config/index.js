import { toObjectLine } from '../utils';
import { dispatch, getState } from '../Store';
import { CONFIG_INIT, CONFIG_UPDATE } from './reducer';
import { config as configSelector } from './selectors';

let _config = {};

function get(key) {
  return configSelector(getState())[key];
}

function set(key, value) {
  dispatch({
    type: CONFIG_UPDATE,
    values: { [key]: value }
  })
}


export default function Config(values) {
  _config = toObjectLine(values);
  dispatch({
    type: CONFIG_INIT,
    values
  });
}


export function config(key, value) {
  if (void 0 !== value) {
    return set(key, value);
  }
  return get(key);
}