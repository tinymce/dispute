export const map = <A, B>(xs: ArrayLike<A>, f: (a: A) => B): B[] => {
  const len = xs.length;
  const r = new Array(len);
  for (let i = 0; i < len; i++) {
    const x = xs[i];
    r[i] = f(x);
  }
  return r;
};

/** map a function over an array, then map another function over every item except the last */
export const mapDelimit = <A, B> (xs: ArrayLike<A>, f: (a: A) => B, delimit: (b: B) => B): B[] => {
  const len = xs.length;
  const r = new Array(len);
  for (let i = 0; i < len - 1; i++) {
    const x = xs[i];
    r[i] = delimit(f(x));
  }
  if (len > 0) {
    r[len - 1] = (f(xs[len - 1]));
  }

  return r;
};

export const sort = <A> (xs: ArrayLike<A>, compareFn?: (a: A, b: A) => number): A[] => {
  const clone: A[] = Array.prototype.slice.call(xs);
  return clone.sort(compareFn);
};
