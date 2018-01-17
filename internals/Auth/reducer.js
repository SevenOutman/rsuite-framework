import { config } from '../Config';
import { model } from '../ORM';

const initialState = {
  user: null,
};

const AUTH_SET_USER = 'AUTH_SET_USER';

export default function (state = initialState, { type, user }) {
  switch (type) {
    case AUTH_SET_USER:
      if (config('auth.driver') === 'orm') {
        return {
          ...state,
          user: user[model(config('auth.model'))._modelClass.primaryKey],
        };
      }
      return {
        ...state,
        user,
      };
    default:
      return state;
  }
}

export {
  AUTH_SET_USER,
};
