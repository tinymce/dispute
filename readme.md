Dispute
=======

This library contains very basic type classes:

 - Eq - equality
 - Show - printing values as literals for debugging
 - Pprint - pretty-printing values
 - Testable - Eq + Pprint

Testable is useful for test assertion libraries. You can use Dispute functionality test that two values are equal, and if they're not, pretty-print the expected and actual.

Dispute provides instances for common TypeScript types, as well as for `any` types, using type inspection. 
It is also extendable to types which can't be compared correctly with type inspection - e.g. church-encoded types.

