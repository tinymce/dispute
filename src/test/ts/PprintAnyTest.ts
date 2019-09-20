import { Pprint } from '../../main/ts/api/Pprint';

import { assert } from 'chai';

const {pprintAny, render} = Pprint;

describe('pprintAny', () => {
  it('renders numbers', () => {
    assert.strictEqual(
      render(1, pprintAny),
      '1'
    );

    assert.strictEqual(
      render(0, pprintAny),
      '0'
    );
  });

  it('renders strings', () => {
    assert.strictEqual(
      render('hello', pprintAny),
      "'hello'"
    );
  });

  it('renders objects', () => {
    assert.strictEqual(
      render({a: 3, b: [7, function() { throw new Error(); }]}, pprintAny),
      [
        '{',
        '  "a": 3,',
        '  "b": [',
        '    7,',
        '    function() {...}',
        '  ]',
        '}'
      ].join('\n')
    );

    assert.strictEqual(
      render({a: [[3]], z: [true, {z: undefined}]}, pprintAny),
      [
        '{',
        '  "a": [',
        '    [',
        '      3',
        '    ]',
        '  ],',
        '  "z": [',
        '    true,',
        '    {',
        '      "z": undefined',
        '    }',
        '  ]',
        '}'
      ].join('\n')
    );
  })
});
