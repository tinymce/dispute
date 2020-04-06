import { eqAny, eqNull, eqUndefined, eqNumber, eqString, eqArray, eqRecord, contramap } from '../../main/ts/api/Eq';
import { assert } from 'chai';
import * as fc from 'fast-check';

describe('eqNull', () => {
  it('eqs', () => {
    assert.strictEqual(eqNull.eq(null, null), true);
    assert.strictEqual(eqNull.eq(null, 7 as any), false);
    assert.strictEqual(eqNull.eq('x' as any, 7 as any), false);
  });
});

describe('eqUndefined', () => {
  it('eqs', () => {
    assert.strictEqual(eqUndefined.eq(undefined, undefined), true);
    assert.strictEqual(eqUndefined.eq(undefined, 7 as any), false);
    assert.strictEqual(eqUndefined.eq('x' as any, 7 as any), false);
  });
});

describe('eqNumber', () => {
  it('eqs', () => {
    fc.assert(fc.property(fc.integer(), (n) => eqNumber.eq(n, n)));
    fc.assert(fc.property(fc.integer(), (n) => !eqNumber.eq(n, n + 1)));
  });
});

describe('eqString', () => {
  it('eqs', () => {
    fc.assert(fc.property(fc.string(), (s) => eqString.eq(s, s)));
    fc.assert(fc.property(fc.string(), fc.char(), (s, c) => !eqString.eq(s, s + c)));
    assert.strictEqual(eqString.eq('cat', 'cat'), true);
    assert.strictEqual(eqString.eq('', ''), true);
    assert.strictEqual(eqString.eq('', 'z'), false);
  });
});

describe('eqArrayNumber', () => {
  it('eqs', () => {
    fc.assert(fc.property(fc.array(fc.integer()), (xs) => eqArray(eqNumber).eq(xs, xs)));
    fc.assert(fc.property(fc.array(fc.integer()), (xs) => eqArray(eqNumber).eq(xs, Array.prototype.slice.call(xs))));
    assert.strictEqual(eqArray(eqNumber).eq([], []), true);
    assert.strictEqual(eqArray(eqNumber).eq([1], [1]), true);
    assert.strictEqual(eqArray(eqNumber).eq([0], [1]), false);
  });
});

describe('eqArrayArray', () => {
  it('eqs', () => {
    fc.assert(fc.property(fc.array(fc.array(fc.string())), (xss) => eqArray(eqArray(eqString)).eq(xss, xss)));
    fc.assert(fc.property(fc.array(fc.array(fc.string())), (xss) => eqArray(eqArray(eqString)).eq(xss, Array.prototype.slice.call(xss))));
    assert.strictEqual(eqArray(eqArray(eqString)).eq([], []), true);
    assert.strictEqual(eqArray(eqArray(eqString)).eq([[]], [[]]), true);
    assert.strictEqual(eqArray(eqArray(eqString)).eq([[], []], [[], []]), true);
    assert.strictEqual(eqArray(eqArray(eqString)).eq([['1'], []], [['1'], []]), true);
    assert.strictEqual(eqArray(eqArray(eqString)).eq([[''], []], [[''], []]), true);
    assert.strictEqual(eqArray(eqArray(eqString)).eq([[''], []], [['0'], []]), false);
  });
});

describe('eqRecord', () => {
  it('eqs', () => {
    assert.strictEqual(eqRecord(eqString).eq({}, {}), true);
    assert.strictEqual(eqRecord(eqString).eq({a: '3'}, {a: '3'}), true);
    assert.strictEqual(eqRecord(eqString).eq({a: '3'}, {b: '3'}), false);
    assert.strictEqual(eqRecord(eqString).eq({a: ''}, {a: 'f'}), false);
    assert.strictEqual(eqRecord(eqArray(eqNumber)).eq({a: [1, 7]}, {a: [1, 9]}), false);
    assert.strictEqual(eqRecord(eqArray(eqNumber)).eq({a: [1, 7]}, {a: [1, 7]}), true);
  });

  it('eqs with different key order', () => {
    assert.strictEqual(eqRecord(eqString).eq(
      {a: 'cat', b: 'dog'},
      {b: 'dog', a: 'cat'}
    ), true);
  });
});

describe('eqAny', () => {
  it('eqs', () => {
    fc.assert(fc.property(fc.anything(), (x) => (typeof x === 'number' && isNaN(x)) || eqAny.eq(x, x)));
    fc.assert(fc.property(fc.anything(), (x) => (typeof x === 'number' && isNaN(x)) || !eqAny.eq(x, {z: x})));

    assert.strictEqual(eqAny.eq(1, 1), true);
    assert.strictEqual(eqAny.eq(1, 2), false);
    assert.strictEqual(eqAny.eq(1, null), false);
    assert.strictEqual(eqAny.eq(1, undefined), false);
    assert.strictEqual(eqAny.eq(1, 'h'), false);
    assert.strictEqual(eqAny.eq(0, ''), false);
    assert.strictEqual(eqAny.eq(0, []), false);
    assert.strictEqual(eqAny.eq(0, {a: 'b'}), false);
    assert.strictEqual(eqAny.eq(0, () => {
      throw new Error();
    }), false);

    assert.strictEqual(eqAny.eq(undefined, undefined), true);
    assert.strictEqual(eqAny.eq(undefined, null), false);
    assert.strictEqual(eqAny.eq(undefined, 3), false);
    assert.strictEqual(eqAny.eq(undefined, 'cat'), false);
    assert.strictEqual(eqAny.eq(undefined, ''), false);
    assert.strictEqual(eqAny.eq(undefined, []), false);
    assert.strictEqual(eqAny.eq(undefined, {}), false);
    assert.strictEqual(eqAny.eq(undefined, {a: NaN}), false);
    assert.strictEqual(eqAny.eq(undefined, () => 3), false);

    assert.strictEqual(eqAny.eq([], []), true);
    assert.strictEqual(eqAny.eq([0], [0]), true);
    assert.strictEqual(eqAny.eq([[0]], [[0]]), true);
    assert.strictEqual(eqAny.eq([[[0]]], [[[0]]]), true);
    assert.strictEqual(eqAny.eq(['cat', {x: 3}, 0, null, undefined], ['cat', {x: 3}, 0, null, undefined]), true);
    assert.strictEqual(eqAny.eq(['cat', {x: 3, y: 8}, 0, null, undefined], ['cat', {x: 3}, 0, null, undefined]), false);
  });

  it('eqs with different key order', () => {
    assert.strictEqual(eqAny.eq(
      {a: 'cat', b: 'dog'},
      {b: 'dog', a: 'cat'}
    ), true);
  });
});

describe('contramap', () => {
  it('contramaps', () => {
    type Numbo = {
      x: number;
    };
    const eqNumbo = contramap<number, Numbo>(eqNumber, (n) => n.x);

    const arb = fc.integer().map((x) => ({x}));

    fc.assert(fc.property(arb, (x) => eqNumbo.eq(x, ({x: x.x}))));

    assert.strictEqual(eqNumbo.eq({x: 3}, {x: 3}), true);
    assert.strictEqual(eqNumbo.eq({x: 3}, {x: 4}), false);
  });
});
