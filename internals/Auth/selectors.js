import { createSelector } from 'reselect';
import { framework as frameworkSelector } from '../Store/selectors';
import { config } from '../Config/functions';
import { model } from '../ORM';

export const auth = createSelector(
  frameworkSelector,
  framework => framework.auth,
);
export const authUser = createSelector(
  auth,
  auth => {
    if (config('auth.driver') === 'orm') {
      model(config('auth.model')).find(auth.user);
    }
    return auth.user;
  },
);
