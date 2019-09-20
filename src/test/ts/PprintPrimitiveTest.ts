import { Pprint } from '../../main/ts/api/Pprint';

import { assert } from 'chai';

const { pprintNumber, pprintNull, pprintString, render, pprintUndefined } = Pprint;

describe('pprintNumber', () => {
  it('renders', () => {
    assert.strictEqual('3', render(3, pprintNumber));
    assert.strictEqual('3.5', render(3.5, pprintNumber));
  });
});

describe('string', () => {
  it('renders', () => {
    assert.strictEqual("'a'", render('a', pprintString));
    assert.strictEqual('\'a\\\'b\'', render('a\'b', pprintString));
  });
});

describe('undefined', () => {
  it('renders', () => {
    assert.strictEqual('undefined', render(undefined, pprintUndefined));
  });
});

describe('null', () => {
  it('renders', () => {
    assert.strictEqual('null', render(null, pprintNull));
  });
});
