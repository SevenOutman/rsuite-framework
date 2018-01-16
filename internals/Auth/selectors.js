import { createSelector } from 'reselect';
import { framework as frameworkSelector } from '../Store/selectors';

export const auth = createSelector(
  frameworkSelector,
  framework => framework.auth
);
