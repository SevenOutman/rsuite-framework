import { createSelector } from 'reselect';
import { framework as frameworkSelector } from '../Store/selectors';
import Model from './Model';
import { getState } from '../Store';

const dbSelector = createSelector(
  frameworkSelector,
  framework => framework.db,
);

class ORM {

  _tableName;
  _modelClass;

  constructor(tableName, ModelClass) {
    this._tableName = tableName;
    this._modelClass = ModelClass;

    this._makeSelector();
  }

  _makeSelector() {
    this._selector = createSelector(
      dbSelector,
      db => db[this._tableName],
    );
  }

  find(id) {
    if (!id) {
      return null;
    }
    return this._selector(getState())[id];
  }
}

let _models = {};

export function model(tableName) {
  return _models[tableName];
}

export function initModel(tableName, ModelClass) {
  if (!(new ModelClass() instanceof Model)) {
    console.error('ORM model must extend Model at @rsuite/framework/orm');
    return ModelClass;
  }

  if (!ModelClass.primaryKey) {
    ModelClass.primaryKey = Model.primaryKey;
  }

  return _models[tableName] = new ORM(ModelClass);
}
