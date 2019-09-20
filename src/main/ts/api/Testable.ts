import { Eq } from './Eq';
import { Pprint } from './Pprint';

const { pprintUndefined, pprintNull, pprintString, pprintNumber, pprintArray, pprintRecord, pprintJsonStringify } = Pprint;
const { eqUndefined, eqNull, eqString, eqNumber, eqArray, eqRecord, eqAny } = Eq;

/** To test a type, you should be able to compare 2 values and print them out. */
export interface Testable<A> extends Eq<A>, Pprint<A> {}

const testable = <A> (eqA: Eq<A>, pprintA: Pprint<A>) => ({
  ...eqA,
  ...pprintA
});

const tUndefined = testable(eqUndefined, pprintUndefined);

const tNull = testable(eqNull, pprintNull);

const tString = testable(eqString, pprintString);

const tNumber = testable(eqNumber, pprintNumber);

const tArray = <A> (ta: Testable<A>): Testable<A[]> =>
  testable(eqArray(ta), pprintArray(ta));

const tArray_ = <A> (eqA: Eq<A>, PprintA: Pprint<A>): Testable<A[]> =>
  testable(eqArray(eqA), pprintArray(PprintA));

const tRecord = <A> (ta: Testable<A>): Testable<Record<string, A>> =>
  testable(eqRecord(ta), pprintRecord(ta));

const tRecord_ = <A> (eqA: Eq<A>, PprintA: Pprint<A>): Testable<Record<string, A>> =>
  testable(eqRecord(eqA), pprintRecord(PprintA));

const tDeepAny = testable(eqAny, pprintJsonStringify);

export const Testable = {
  testable,
  tUndefined,
  tNull,
  tString,
  tNumber,
  tArray,
  tArray_,
  tRecord,
  tRecord_,
  tDeepAny
};
