import * as ArrayUtil from './ArrayUtil';

export const singleQuote = (x) => "'" + x.replace(/'/g, "\\'") + "'";
export const doubleQuote = (x) => '"' + x.replace(/"/g, '\\"') + '"';

export const repeat = (n: number, s: string): string => {
  let r = '';
  for (let i = 0; i < n; i++) {
    r += s;
  }
  return r;
};
