import * as Type from '../core/Type';

/** A way of comparing two values of the same type for equality. */
export interface Eq<A> {
  eq: (x: A, y: A) => boolean;
}

const contramap = <A, B> (eqa: Eq<A>, f: (b: B) => A): Eq<B> =>
  eq((x, y) => eqa.eq(f(x), f(y)));

export const eq = <A> (eq: (x: A, y: A) => boolean): Eq<A> =>
  ({ eq });

const tripleEq: Eq<any> = eq((x, y) => x === y);

const eqString: Eq<string> = tripleEq;

const eqBoolean: Eq<boolean> = tripleEq;

const eqNumber: Eq<number> = tripleEq;

const eqUndefined: Eq<undefined> = tripleEq;

const eqNull: Eq<null> = tripleEq;

const eqArray = <A> (eqa: Eq<A>): Eq<Array<A>> => eq((x, y) => {
  if (x.length !== y.length) return false;
  for (let i = 0, len = x.length; i < len; i++) {
    if (!eqa.eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
});

const eqRecord = <A> (eqa: Eq<A>): Eq<Record<string, A>> => eq((x, y) => {
  const kx = Object.keys(x);
  const ky = Object.keys(y);
  if (!eqArray(eqString).eq(kx, ky)) {
    return false;
  }
  for (let i = 0, len = kx.length; i < len; i++) {
    const q = kx[i];
    if (!eqa.eq(x[q], y[q])) {
      return false;
    }
  }
  return true;
});

const eqAny: Eq<any> = eq((x, y) => {
  if (x === y) return true;

  const tx = Type.typeOf(x);
  const ty = Type.typeOf(y);
  if (tx !== ty) return false;

  if (Type.isEquatableType(tx)) {
    return x === y;

  } else if (tx === 'array') {
    return eqArray(eqAny).eq(x, y);

  } else if (tx === 'object') {
    return eqRecord(eqAny).eq(x, y);
  }

  return false;
});

export const Eq = {
  contramap,
  tripleEq,
  eqUndefined,
  eqNull,
  eqString,
  eqBoolean,
  eqNumber,
  eqArray,
  eqRecord,
  eqAny
};
