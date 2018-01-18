import Application from '../Application';
import { config } from '../Config';

const App = {};

App.setLocale = function (locale) {
  return config('app.locale', locale);
};

App.name = function () {
  return 'HYPER Video Analytics';
};

export default App;


export function app(mod) {
  if (mod) return app().mod(mod);
  return Application.getInstance();
}

export function mods() {
  return app()._mods;
}

export function app_name() {
  return config('app.name');
}
