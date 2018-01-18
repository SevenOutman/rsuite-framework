import { app } from '../App/functions';

export function config(key, value) {
  const { set, get } = app('config');
  if (void 0 !== value) {
    return set(key, value);
  }
  return get(key);
}
