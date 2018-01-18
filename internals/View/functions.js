import { app } from '../App/functions';

export function title(...args) {
  return app('view').title(...args);
}
