export type Iterable<V> = object & {
  values(): IterableIterator<V> | V[];
};
