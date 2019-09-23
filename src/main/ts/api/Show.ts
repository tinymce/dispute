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

export const showConst = (s: string): Show<any> => show(() => s);

export const showStringCtor: Show<any> = show((x) => String(x));

export const showJsonStringify: Show<any> = show((x) => JSON.stringify(x));

export const showUndefined: Show<undefined> = showConst('undefined');

export const showNull: Show<null> = showConst('null');

export const showBoolean: Show<boolean> = showStringCtor;

export const showNumber: Show<number> = showStringCtor;

export const showString: Show<string> = show((x) => singleQuote(x));

export const showFunction: Show<Function> = showConst('function() {...}');

export const showArray = <A> (showA: Show<A>): Show<ArrayLike<A>> => show((xs) =>
  '[' + ArrayUtil.map(xs, showA.show).join(', ') + ']'
);

export const showRecord = <A> (showA: Show<A>): Show<Record<string, A>> => show((rec) =>
  '{' + ObjectUtil.toTuples(rec).map(([k, v]) => doubleQuote(k) + ': ' + showA.show(v)).join(', ') + '}'
);
