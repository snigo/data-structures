const entries = [
  ['a', 1],
  ['b', 2],
  ['c', 2],
] as const;

const date = new Date();

export const valueKeyPairs = [
  ['Paris', '"Paris"'],
  [17523, '17523'],
  [false, 'false'],
  [undefined, 'undefined'],
  [null, 'null'],
  [Symbol('X'), 'Symbol(X)'],
  [2974293472934729347n, 'BigInt(2974293472934729347)'],
  [entries, '[["a",1],["b",2],["c",2]]'],
  [date, `Date(${date.toISOString()})`],
  [new Set([1, 2, 3]), 'Set([1,2,3])'],
  [new Map(entries), 'Map([["a",1],["b",2],["c",2]])'],
  [new URL('https://example.com'), 'URL(https://example.com/)'],
  [Object.fromEntries(entries), '{"a":1,"b":2,"c":2}'],
  [() => 42, 'Function(()=>42)'],
];

export const compareResults = [
  [1, 2, -1],
  [2, 1, 1],
  [1, 1, 0],
  ['alpha', 'beta', -1],
  ['beta', 'alpha', 1],
  ['alpha', 'alpha', 0],
  [10, 2, 1],
  [-2, 1, -1],
  [NaN, NaN, 0],
];

export const equalityResults = [
  [42, '42', false, false],
  [42, 42, true, true],
  [Symbol('a'), Symbol('a'), true, false],
  [42n, 42, false, false],
  [[1, 2, 3], [1, 2, 3], true, false],
  [NaN, NaN, true, true],
  ['Paris', 'Paris', true, true],
  [{ a: 42, b: true }, { a: 42, b: false }, false, false],
  [{ a: 42, b: 14 }, { a: 42, b: 14 }, true, false],
];
