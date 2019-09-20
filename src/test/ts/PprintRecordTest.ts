import { Pprint } from '../../main/ts/api/Pprint';

import { assert } from 'chai';

const {pprintNumber, pprintRecord, pprintArray, render} = Pprint;

describe('pprintRecord', () => {
  it('renders record of number', () => {
    assert.strictEqual(
      '{\n' +
      '  "a": 3,\n' +
      '  "b": 7\n' +
      '}',
      render(
        {a: 3, b: 7},
        pprintRecord(pprintNumber)
      )
    );

    assert.strictEqual(
      '{\n' +
      '  "a": 1.1\n' +
      '}',
      render(
        {a: 1.1},
        pprintRecord(pprintNumber)
      )
    );

    assert.strictEqual(
      '{}',
      render(
        {},
        pprintRecord(pprintNumber)
      )
    );
  });
});

describe('string: number[]', () => {
  it('renders record array number', () => {
    assert.strictEqual(
      '{\n' +
      '  "a": [\n' +
      '    3\n' +
      '  ],\n' +
      '  "b": [\n' +
      '    4\n' +
      '  ]\n' +
      '}',
      render({
        a: [3],
        b: [4]
      }, pprintRecord(pprintArray(pprintNumber)))
    );
  });
});
