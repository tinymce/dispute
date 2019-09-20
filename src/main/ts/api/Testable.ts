import * as Eq from './Eq';
import * as Pprint from './Pprint';

const { pprintUndefined, pprintNull, pprintString, pprintNumber, pprintArray, pprintRecord, pprintJsonStringify } = Pprint;
const { eqUndefined, eqNull, eqString, eqNumber, eqArray, eqRecord, eqAny } = Eq;

type Eq<A> = Eq.Eq<A>;
type Pprint<A> = Pprint.Pprint<A>;

/** To test a type, you should be able to compare 2 values and print them out. */
export interface Testable<A> extends Eq<A>, Pprint<A> {}

export const testable = <A> (eqA: Eq<A>, pprintA: Pprint<A>) => ({
  ...eqA,
  ...pprintA
});

export const tUndefined = testable(eqUndefined, pprintUndefined);

export const tNull = testable(eqNull, pprintNull);

export const tString = testable(eqString, pprintString);

export const tNumber = testable(eqNumber, pprintNumber);

export const tArray = <A> (ta: Testable<A>): Testable<ArrayLike<A>> =>
  testable(eqArray(ta), pprintArray(ta));

export const tArray_ = <A> (eqA: Eq<A>, PprintA: Pprint<A>): Testable<ArrayLike<A>> =>
  testable(eqArray(eqA), pprintArray(PprintA));

export const tRecord = <A> (ta: Testable<A>): Testable<Record<string, A>> =>
  testable(eqRecord(ta), pprintRecord(ta));

export const tRecord_ = <A> (eqA: Eq<A>, PprintA: Pprint<A>): Testable<Record<string, A>> =>
  testable(eqRecord(eqA), pprintRecord(PprintA));

export const tDeepAny = testable(eqAny, pprintJsonStringify);
