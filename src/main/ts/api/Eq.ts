import * as Type from '../core/Type';

/** A way of comparing two values of the same type for equality. */
export interface Eq<A> {
  eq: (x: A, y: A) => boolean;
}

export const contramap = <A, B> (eqa: Eq<A>, f: (b: B) => A): Eq<B> =>
  eq((x, y) => eqa.eq(f(x), f(y)));

export const eq = <A> (f: (x: A, y: A) => boolean): Eq<A> =>
  ({ eq: f });

export const tripleEq: Eq<any> = eq((x, y) => x === y);

export const eqString: Eq<string> = tripleEq;

export const eqBoolean: Eq<boolean> = tripleEq;

export const eqNumber: Eq<number> = tripleEq;

export const eqUndefined: Eq<undefined> = tripleEq;

export const eqNull: Eq<null> = tripleEq;

export const eqArray = <A> (eqa: Eq<A>): Eq<ArrayLike<A>> => eq((x, y) => {
  if (x.length !== y.length) { return false; }
  const len = x.length;
  for (let i = 0; i < len; i++) {
    if (!eqa.eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
});

export const eqRecord = <A> (eqa: Eq<A>): Eq<Record<string, A>> => eq((x, y) => {
  const kx = Object.keys(x);
  const ky = Object.keys(y);
  if (!eqArray(eqString).eq(kx, ky)) {
    return false;
  }
  const len = kx.length;
  for (let i = 0; i < len; i++) {
    const q = kx[i];
    if (!eqa.eq(x[q], y[q])) {
      return false;
    }
  }
  return true;
});

export const eqAny: Eq<any> = eq((x, y) => {
  if (x === y) { return true; }

  const tx = Type.typeOf(x);
  const ty = Type.typeOf(y);
  if (tx !== ty) { return false; }

  if (Type.isEquatableType(tx)) {
    return x === y;

  } else if (tx === 'array') {
    return eqArray(eqAny).eq(x, y);

  } else if (tx === 'object') {
    return eqRecord(eqAny).eq(x, y);
  }

  return false;
});
