import { createSelector } from 'reselect';
import { auth as authSelector } from './selectors';
import { getState } from '../Store';


function user() {
  return authSelector(getState()).user;
}

function id() {
  return user().id;
}

export default {
  user,
  id
};
