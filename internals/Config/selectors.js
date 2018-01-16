import { createSelector } from 'reselect';
import { framework as frameworkSelector } from '../Store/selectors';

export const config = createSelector(
  frameworkSelector,
  framework => framework.config
);
