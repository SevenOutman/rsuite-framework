import { createSelector } from 'reselect';
import { authUser as authUserSelector } from './selectors';
import { dispatch, getState } from '../Store';
import { optional as opt } from '../utils';
import { AUTH_SET_USER } from './reducer';


function user(user) {
  if (user) {
    return setUser(user);
  }
  return authUserSelector(getState());
}

function id() {
  return opt(user()).id;
}

function setUser(user) {
  dispatch({
    type: AUTH_SET_USER,
    user
  })
}

export default {
  user,
  id,
  setUser
};
