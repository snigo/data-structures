import fnvPlus from 'fnv-plus';
import MurmurHash3 from 'imurmurhash';

import { clamp } from './utils/bloomFilter.js';
import { stringify } from './utils/stringify.js';

const MIN_SIZE = 64;
const DEFAULT_SIZE = 256;
const MAX_SIZE = 0xffffffff;
const BITS = 32;
const K = 2;

export class BloomFilter<Value> {
  private bitArray: Uint32Array;

  bitSize: number;

  constructor(size?: number) {
    const M =
      size && Number.isFinite(size)
        ? clamp(size, MIN_SIZE, MAX_SIZE)
        : DEFAULT_SIZE;
    const bitSize = Math.trunc((K * M) / Math.LN2);
    this.bitArray = new Uint32Array(Math.ceil(bitSize / BITS));
    this.bitSize = bitSize;
  }

  static from<V>(values: Iterable<V>) {
    const array = Array.from(values);
    return new BloomFilter(array.length).addAll(array);
  }

  add(value: Value) {
    const stringValue = stringify(value);
    const fnv = fnvPlus.fast1a32(stringValue) % this.bitSize;
    const fnvIndex = Math.floor(fnv / BITS);
    const fnvPosition = fnv % BITS;
    const mur = MurmurHash3(stringValue).result() % this.bitSize;
    const murIndex = Math.floor(mur / BITS);
    const murPosition = mur % BITS;
    this.bitArray[fnvIndex] |= 1 << fnvPosition;
    this.bitArray[murIndex] |= 1 << murPosition;
    return this;
  }

  addAll(values: Iterable<Value>) {
    for (const value of values) {
      this.add(value);
    }
    return this;
  }

  has(value: Value) {
    const stringValue = stringify(value);
    const fnv = fnvPlus.fast1a32(stringValue) % this.bitSize;
    const fnvIndex = Math.floor(fnv / BITS);
    const fnvPosition = fnv % BITS;
    if ((this.bitArray[fnvIndex]! & (1 << fnvPosition)) === 0) {
      return false;
    }
    const mur = MurmurHash3(stringValue).result() % this.bitSize;
    const murIndex = Math.floor(mur / BITS);
    const murPosition = mur % BITS;
    return (this.bitArray[murIndex]! & (1 << murPosition)) !== 0;
  }
}
