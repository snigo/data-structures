import assert from 'node:assert';
import { describe, it } from 'node:test';

import { BloomFilter } from 'src/BloomFilter.js';

describe('BloomFilter class constructor', () => {
  it('allows to set the size of data set', () => {
    const bloom1 = new BloomFilter(10);
    assert.strictEqual(bloom1.bitSize, 184);

    const bloom2 = new BloomFilter(1000);
    assert.strictEqual(bloom2.bitSize, 2885);

    const bloom3 = new BloomFilter();
    assert.strictEqual(bloom3.bitSize, 738);
  });
});

describe('BloomFilter static from method', () => {
  it('allows to create bloom filter based on existing array', () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
    const bloom = BloomFilter.from(arr);
    assert.strictEqual(bloom.bitSize, 2885);
  });

  it('allows to create bloom filter based on existing array', () => {
    const set = new Set([1, 2, 3]);
    const bloom = BloomFilter.from(set);
    assert.strictEqual(bloom.bitSize, 184);
  });
});

describe('BloomFilter prototype methods', () => {
  it('allows to add and check existance of items in a set', () => {
    const bloom = new BloomFilter<number>(64);
    bloom.add(43);
    assert.strictEqual(bloom.has(43), true);
    assert.strictEqual(bloom.has(42), false);
  });

  it('allows to add multiple items at the same time', () => {
    const arr = [1, 10, 100, 1000];
    const bloom = new BloomFilter<number>(64);
    bloom.addAll(arr);
    arr.forEach(n => {
      assert.strictEqual(bloom.has(n), true);
      assert.strictEqual(bloom.has(n + 5), false);
    });
  });
});
