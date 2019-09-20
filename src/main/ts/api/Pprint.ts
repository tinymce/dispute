import { Show } from './Show';
import * as ArrayUtil from '../core/ArrayUtil';
import * as ObjectUtil from '../core/ObjectUtil';
import * as StringUtil from '../core/StringUtil';
import * as Type from '../core/Type';
import { Pnode } from './Pnode';

export interface Pprint<A> {
  pprint: (a: A) => Pnode
}

const pprint = <A> (pprint: (a: A) => Pnode): Pprint<A> => ({pprint});

const render = <A> (a: A, pprint: Pprint<A>): string => {
  const n = pprint.pprint(a);
  return Pnode.render(n);
};

const pprintShow = <A> (show: Show<A>): Pprint<A> =>
  pprint((a) => Pnode.single(show.show(a)));

const pprintUndefined: Pprint<undefined> = pprintShow(Show.showUndefined);
const pprintNull: Pprint<undefined> = pprintShow(Show.showNull);
const pprintString: Pprint<string> = pprintShow(Show.showString);
const pprintBoolean: Pprint<boolean> = pprintShow(Show.showBoolean);
const pprintNumber: Pprint<number> = pprintShow(Show.showNumber);
const pprintFunction: Pprint<Function> = pprintShow(Show.showFunction);
const pprintStringCtor: Pprint<any> = pprintShow(Show.showStringCtor);
const pprintJsonStringify: Pprint<any> = pprintShow(Show.showJsonStringify);

const pprintArray = <A> (pprintA: Pprint<A>): Pprint<A[]> => pprint((xs) => {
  const c = ArrayUtil.mapDelimit(xs, pprintA.pprint, Pnode.appendEnd(','));
  return Pnode.pnode('[', c, ']');
});

const pprintRecord = <A> (pprintA: Pprint<A>): Pprint<Record<string, A>> => pprint((r) => {
  const tuples = ObjectUtil.toTuples(r);

  const cnode = (t: {k: string, v: A}) => {
    const pv = pprintA.pprint(t.v);
    const start = StringUtil.doubleQuote(t.k) + ': ';
    return Pnode.prependStart(start)(pv);
  };

  const c = ArrayUtil.mapDelimit(tuples, cnode, Pnode.appendEnd(','));
  return Pnode.pnode('{', c, '}');
});

const pprintAny: Pprint<any> = pprint((a) => {
  if (Type.isUndefined(a)) {
    return pprintUndefined.pprint(a);
  } else if (Type.isNull(a)) {
    return pprintNull.pprint(a);
  } else if (Type.isNumber(a)) {
    return pprintNumber.pprint(a);
  } else if (Type.isBoolean(a)) {
    return pprintBoolean.pprint(a);
  } else if (Type.isFunction(a)) {
    return pprintFunction.pprint(a);
  } else if (Type.isString(a)) {
    return pprintString.pprint(a);
  } else if (Type.isArray(a)) {
    return pprintArray(pprintAny).pprint(a);
  } else if (Type.isObject(a)) {
    return pprintRecord(pprintAny).pprint(a);
  } else {
    return pprintStringCtor.pprint(a);
  }
});

export const Pprint = {
  pprint,
  render,
  pprintShow,
  pprintUndefined,
  pprintNull,
  pprintString,
  pprintBoolean,
  pprintNumber,
  pprintArray,
  pprintRecord,
  pprintAny,
  pprintJsonStringify
};
