import { pprintNumber, pprintArray, pprintString, render, pprint, Pprint } from '../../main/ts/api/Pprint';
import { single, pnode } from '../../main/ts/api/Pnode';

import { assert } from 'chai';

interface Some<T> {
  'kind': 'some';
  value: T;
}

interface None<T> {
  'kind': 'none';
}

type Maybe<T> = Some<T> | None<T>;

const some = <A>(value: A): Maybe<A> => ({
  kind: 'some',
  value
});

const none = <A>(): Maybe<A> => ({
  kind: 'none'
});

const pprintMaybe = <A>(pprintA: Pprint<A>): Pprint<Maybe<A>> => pprint((oa) => {
  if (oa.kind === 'none') {
    return single('None()');
  } else {
    return pnode('Some(', [pprintA.pprint(oa.value)], ')');
  }
});

describe('pprintMaybe', () => {
  it('renders', () => {
    assert.strictEqual(
      render(
        some([some('a')]),
        pprintMaybe(pprintArray(pprintMaybe(pprintString)))),
      'Some(\n' +
      '  [\n' +
      '    Some(\n' +
      '      \'a\'\n' +
      '    )\n' +
      '  ]\n' +
      ')'
    );

    assert.strictEqual(
      render(none<number>(), pprintMaybe(pprintNumber)),
      'None()'
    );

    assert.strictEqual(
      render(some<number>(22), pprintMaybe(pprintNumber)),
      'Some(\n' +
      '  22\n' +
      ')'
    );
  });
});
