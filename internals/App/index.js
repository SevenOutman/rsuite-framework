import Application from '../Application';
import { config } from '../Config';

function setLocale(locale) {
  return config('app.locale', locale);
}

function name() {
  return config('app.name');
}

export default {
  name,
  setLocale
};
