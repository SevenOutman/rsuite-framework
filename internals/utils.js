export function optional(obj) {
  return obj || {};
}

export function toObjectLine(object) {
  let objectLine = {};

  function isObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
  }

  function find(target, keys = []) {
    for (let key in target) {
      if (!isObject(target[key]) || ((isObject(target[key]) && Object.keys(target[key]).length === 0))) {
        objectLine[`${keys.concat(key).join('.')}`] = target[key];
        continue;
      }
      find(target[key], keys.concat(key));
    }
  }

  find(object);
  return objectLine;
}