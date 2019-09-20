import { Pprint } from '../../main/ts/api/Pprint';

import { assert } from 'chai';

const {pprintNumber, pprintArray, render} = Pprint;

describe('Pprint', () => {
  it('renders number[]', () => {

    assert.strictEqual(
      render([], pprintArray(pprintNumber)),
      '[]'
    );

    assert.strictEqual(
      render([7], pprintArray(pprintNumber)),
      '[\n' +
      '  7\n' +
      ']'
    );

    assert.strictEqual(
      render([3, 4], pprintArray(pprintNumber)),
      '[\n' +
      '  3,\n' +
      '  4\n' +
      ']'
    );
  });

  it('renders string[][]', () => {
    assert.strictEqual(
      render([[3, 4]], pprintArray(pprintArray(pprintNumber))),
      '[\n' +
      '  [\n' +
      '    3,\n' +
      '    4\n' +
      '  ]\n' +
      ']'
    );

    assert.strictEqual(
      render([], pprintArray(pprintArray(pprintNumber))),
      '[]'
    );

    assert.strictEqual(
      render([[]], pprintArray(pprintArray(pprintNumber))),
      '[\n' +
      '  []\n' +
      ']'
    );

    assert.strictEqual(
      render([[8]], pprintArray(pprintArray(pprintNumber))),
      '[\n' +
      '  [\n' +
      '    8\n' +
      '  ]\n' +
      ']'
    );

    assert.strictEqual(
      render([[8], [1]], pprintArray(pprintArray(pprintNumber))),
      '[\n' +
      '  [\n' +
      '    8\n' +
      '  ],\n' +
      '  [\n' +
      '    1\n' +
      '  ]\n' +
      ']'
    );
  });
});
