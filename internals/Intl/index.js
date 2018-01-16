import { config } from '../Config';
import { toObjectLine } from '../utils';

let _locales = {};

export default function Intl(locales) {
  _locales = {};
  Object.keys(locales).forEach((locale) => {
    _locales[locale] = toObjectLine(locales[locale]);
  });
}
Intl.messages = function () {
  return _locales[config('app.locale')];
};

export function localize(id) {
  return Intl.messages()[id];
}
