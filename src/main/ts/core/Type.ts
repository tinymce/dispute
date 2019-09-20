export const typeOf = function (x: any) {
  if (x === null) {
    return 'null';
  }
  if (x === undefined) {
    return 'undefined';
  }
  const t = typeof x;
  if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
    return 'array';
  }
  if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
    return 'string';
  }
  return t;
};

const isType = (type: string) => (value: any) => typeOf(value) === type;

export const isString = <(value: any) => value is string> isType('string');
export const isObject = isType('object');
export const isArray = <(value: any) => value is Array<any>> isType('array');
export const isNull = <(value: any) => value is null> isType('null');
export const isBoolean = <(value: any) => value is boolean> isType('boolean');
export const isUndefined = <(value: any) => value is undefined> isType('undefined');
export const isFunction = <(value: any) => value is Function> isType('function');
export const isNumber = <(value: any) => value is number> isType('number');

export const isEquatableType = (x: string): boolean =>
  [ 'undefined', 'boolean', 'number', 'string', 'function', 'xml', 'null' ].indexOf(x) != -1;
