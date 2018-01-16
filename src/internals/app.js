import App from './App/index';
import Application from './Application';

export function app() {
  return Application.getInstance();
}

export function app_name() {
  return App.name();
}
