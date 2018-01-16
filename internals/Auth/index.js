import { createSelector } from 'reselect';
import { auth as authSelector } from './selectors';
import { getState } from '../Store';


const Auth = {};

Auth.user = function () {
  return authSelector(getState()).user;
};

export default Auth;
