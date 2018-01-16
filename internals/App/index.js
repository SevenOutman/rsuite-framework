const App = {};

App.setLocale = function (locale) {
  return config('app.locale', locale);
};

App.name = function () {
  return 'HYPER Video Analytics';
};

export default App;

import Application from '../Application';
import { config } from '../Config';

export function app(mod) {
  if (mod) return app()[mod];
  return Application.getInstance();
}

export function app_name() {
  return config('app.name');
}
