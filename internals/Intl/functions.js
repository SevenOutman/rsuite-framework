import { app } from '../App/functions';

export function localize(id) {
  return app('intl').messages()[id];
}

