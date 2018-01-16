import { app } from '../app';

export function getState() {
  const store = app('store');
  return store ? store.getState() : {};
}

export function dispatch(...args) {
  const store = app('store');
  store && store.dispatch(...args);
}
