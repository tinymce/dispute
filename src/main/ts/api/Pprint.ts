import * as Show from './Show';
import * as ArrayUtil from '../core/ArrayUtil';
import * as ObjectUtil from '../core/ObjectUtil';
import * as StringUtil from '../core/StringUtil';
import * as Type from '../core/Type';
import * as Pnode from './Pnode';

type Pnode = Pnode.Pnode;
type Show<A> = Show.Show<A>;

export interface Pprint<A> {
  pprint: (a: A) => Pnode
}

export const pprint = <A> (pprint: (a: A) => Pnode): Pprint<A> => ({pprint});

export const render = <A> (a: A, pprint: Pprint<A>): string => {
  const n = pprint.pprint(a);
  return Pnode.render(n);
};

export const pprintShow = <A> (show: Show<A>): Pprint<A> =>
  pprint((a) => Pnode.single(show.show(a)));

export const pprintUndefined: Pprint<undefined> = pprintShow(Show.showUndefined);
export const pprintNull: Pprint<undefined> = pprintShow(Show.showNull);
export const pprintString: Pprint<string> = pprintShow(Show.showString);
export const pprintBoolean: Pprint<boolean> = pprintShow(Show.showBoolean);
export const pprintNumber: Pprint<number> = pprintShow(Show.showNumber);
export const pprintFunction: Pprint<Function> = pprintShow(Show.showFunction);
export const pprintStringCtor: Pprint<any> = pprintShow(Show.showStringCtor);
export const pprintJsonStringify: Pprint<any> = pprintShow(Show.showJsonStringify);

export const pprintArray = <A> (pprintA: Pprint<A>): Pprint<A[]> => pprint((xs) => {
  const c = ArrayUtil.mapDelimit(xs, pprintA.pprint, Pnode.appendEnd(','));
  return Pnode.pnode('[', c, ']');
});

export const pprintRecord = <A> (pprintA: Pprint<A>): Pprint<Record<string, A>> => pprint((r) => {
  const tuples = ObjectUtil.toTuples(r);

  const cnode = (t: {k: string, v: A}) => {
    const pv = pprintA.pprint(t.v);
    const start = StringUtil.doubleQuote(t.k) + ': ';
    return Pnode.prependStart(start)(pv);
  };

  const c = ArrayUtil.mapDelimit(tuples, cnode, Pnode.appendEnd(','));
  return Pnode.pnode('{', c, '}');
});

export const pprintAny: Pprint<any> = pprint((a) => {
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
