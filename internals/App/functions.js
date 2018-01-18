import { config } from '../Config/functions';
import Application from '../Application';

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
