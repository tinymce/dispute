export const typeOf = (x: any) => {
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

const isType = <T>(type: string) => (value: any): value is T => typeOf(value) === type;

export const isString = isType<string>('string');
export const isObject = isType<Object>('object');
export const isArray = isType<Array<unknown>>('array');
export const isNull = isType<null>('null');
export const isBoolean = isType<boolean>('boolean');
export const isUndefined = isType<undefined>('undefined');
export const isFunction = isType<Function>('function');
export const isNumber = isType<number>('number');

export const isEquatableType = (x: string): boolean =>
  [ 'undefined', 'boolean', 'number', 'string', 'function', 'xml', 'null' ].indexOf(x) !== -1;
