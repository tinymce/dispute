import { Eq } from '../../main/ts/api/Eq';
import { assert } from 'chai';

const { eqAny, eqNull, eqUndefined, eqNumber, eqString, eqArray, eqRecord, contramap } = Eq;

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
    assert.strictEqual(eqNumber.eq(3, 3), true);
    assert.strictEqual(eqNumber.eq(3, 7), false);
  });
});

describe('eqString', () => {
  it('eqs', () => {
    assert.strictEqual(eqString.eq('cat', 'cat'), true);
    assert.strictEqual(eqString.eq('', ''), true);
    assert.strictEqual(eqString.eq('', 'z'), false);
  });
});

describe('eqArrayNumber', () => {
  it('eqs', () => {
    assert.strictEqual(eqArray(eqNumber).eq([], []), true);
    assert.strictEqual(eqArray(eqNumber).eq([1], [1]), true);
    assert.strictEqual(eqArray(eqNumber).eq([0], [1]), false);
  });
});

describe('eqArrayArray', () => {
  it('eqs', () => {
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
});

describe('eqAny', () => {
  it('eqs', () => {
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
});

describe('contramap', () => {
  it('contramaps', () => {
    type Numbo = {
      x: number;
    }
    const eqNumbo = contramap<number, Numbo>(eqNumber, (n) => n.x);

    assert.strictEqual(eqNumbo.eq({x: 3}, {x: 3}), true);
    assert.strictEqual(eqNumbo.eq({x: 3}, {x: 4}), false);
  })
});
