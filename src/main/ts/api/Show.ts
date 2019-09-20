import * as ArrayUtil from '../core/ArrayUtil';
import * as ObjectUtil from '../core/ObjectUtil';
import { singleQuote, doubleQuote } from '../core/StringUtil';

/** Display the value as it would appear as a literal value in code.
 *  Useful for debug output.
 *
 *  Note this is *not* like Java toString.
 *  So, showString.show("abc") = "'abc'" *not* "abc"
 */
export interface Show<A> {
  show: (a: A) => string
}

export const show = <A> (show: (a: A) => string): Show<A> =>
  ({ show });

const showConst = (s: string): Show<any> => show(() => s);

const showStringCtor: Show<any> = show<any>((x) => String(x));

const showJsonStringify: Show<any> = show<any>((x) => JSON.stringify(x));

const showUndefined: Show<undefined> = showConst('undefined');

const showNull: Show<undefined> = showConst('null');

const showBoolean: Show<boolean> = showStringCtor;

const showNumber: Show<number> = showStringCtor;

const showString: Show<string> = show((x) => singleQuote(x));

const showFunction: Show<Function> = showConst('function() {...}');

const showArray = <A> (showA: Show<A>): Show<A[]> => show((xs) =>
  '[' + ArrayUtil.map(xs, showA.show).join(', ') + ']'
);

const showRecord = <A> (showA: Show<A>): Show<Record<string, A>> => show((rec) =>
  '{' + ObjectUtil.toTuples(rec).map(({k, v}) => doubleQuote(k) + ': ' + showA.show(v)).join(', ') + '}'
);

export const Show = {
  showStringCtor,
  showJsonStringify,
  showUndefined,
  showNull,
  showBoolean,
  showString,
  showNumber,
  showArray,
  showRecord,
  showFunction
};
