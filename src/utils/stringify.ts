const jsonPrimitiveTypes = ['string', 'number', 'boolean'];

export function stringify(value: unknown): string {
  if (!arguments.length) return '';

  if (value === null || jsonPrimitiveTypes.includes(typeof value)) {
    return JSON.stringify(value);
  }

  if (value === undefined) return 'undefined';

  if (typeof value === 'bigint') {
    return `BigInt(${value.toString()})`;
  }

  if (typeof value === 'symbol') {
    return value.toString();
  }

  if (typeof value === 'function') {
    return `Function(${value.toString().replace(/\s+/g, '')})`;
  }

  if (Array.isArray(value)) {
    return `[${value.map(item => stringify(item)).join(',')}]`;
  }

  if (value instanceof Date) {
    return `Date(${value.toISOString()})`;
  }

  if (value instanceof Set) {
    return `Set(${stringify(Array.from(value))})`;
  }

  if (value instanceof Map) {
    return `Map(${stringify(Array.from(value.entries()))})`;
  }

  const sortedKeys = Object.keys(value).sort();
  const string = value.toString();

  if (!sortedKeys.length && !string.startsWith('[object')) {
    return `${value.constructor.name}(${string})`;
  }

  return `{${sortedKeys
    .map(
      key => `${stringify(key)}:${stringify(value[key as keyof typeof value])}`,
    )
    .join(',')}}`;
}
