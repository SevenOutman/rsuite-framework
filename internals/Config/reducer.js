import { toObjectLine } from '../utils';

const initialState = {};

const CONFIG_INIT = 'CONFIG_INIT';
const CONFIG_UPDATE = 'CONFIG_UPDATE';

export default function (state = initialState, { type, values }) {
  switch (type) {
    case CONFIG_INIT:
      return toObjectLine(values);
    case CONFIG_UPDATE:
      return {
        ...state,
        ...values,
      };
    default:
      return state;
  }
}

export {
  CONFIG_INIT,
  CONFIG_UPDATE,
};
