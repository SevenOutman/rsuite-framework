const DEFAULT_PRIMARY_KEY = 'id';

export default class Model {
  static primaryKey = DEFAULT_PRIMARY_KEY;

  [DEFAULT_PRIMARY_KEY] = Number;
}
