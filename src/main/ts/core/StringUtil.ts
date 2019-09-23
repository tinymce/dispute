export const singleQuote = (x: string): string => "'" + x.replace(/'/g, "\\'") + "'";
export const doubleQuote = (x: string): string => '"' + x.replace(/"/g, '\\"') + '"';

export const repeat = (n: number, s: string): string => {
  let r = '';
  for (let i = 0; i < n; i++) {
    r += s;
  }
  return r;
};
