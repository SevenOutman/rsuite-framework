import { config } from '../Config/functions';
import { toObjectLine } from '../utils';

let _locales = {};

function messages() {
  return _locales[config('app.locale')];
}

const Intl = {
  messages,
};


export function initIntl(locales) {
  _locales = {};
  Object.keys(locales).forEach((locale) => {
    _locales[locale] = toObjectLine(locales[locale]);
  });
  return Intl;
}

export default Intl;
