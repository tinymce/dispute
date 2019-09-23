export const toTuples = <T> (obj: Record<string, T>): Array<[string, T]> => {
  const r: Array<[string, T]> = [];
  const props = Object.keys(obj);
  const len = props.length;
  for (let q = 0; q < len; q++) {
    const k = props[q];
    const v = obj[k];
    r.push([k, v]);
  }
  return r;
};
