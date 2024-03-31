import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Queue } from '../Queue.js';

describe('Queue class constructor', () => {
  it('initializes Queue instance with provided array', () => {
    const queue = new Queue([1, 2, 3]);
    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.tail?.value, 3);
    assert.strictEqual(queue.size(), 3);
  });

  it('initializes Queue instance with provided set', () => {
    const queue = new Queue(new Set([1, 2, 3]));
    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.tail?.value, 3);
    assert.strictEqual(queue.size(), 3);
  });

  it('initializes empty Queue instance', () => {
    const queue = new Queue();
    assert.strictEqual(queue.head, null);
    assert.strictEqual(queue.tail, null);
    assert.strictEqual(queue.size(), 0);
  });
});

describe('Queue static from method', () => {
  it('creates Queue from array', () => {
    const array = [1, 2, 3];
    const queue = Queue.from(array);

    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.tail?.value, 3);
  });

  it('creates Queue from set', () => {
    const set = new Set([1, 2, 3]);
    const queue = Queue.from(set);

    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.head?.next?.value, 2);
    assert.strictEqual(queue.tail?.value, 3);
  });

  it('creates Queue from map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const queue = Queue.from(map);

    assert.deepStrictEqual(queue.head?.value, ['a', 1]);
    assert.deepStrictEqual(queue.head?.next?.value, ['b', 2]);
    assert.deepStrictEqual(queue.tail?.value, ['c', 3]);
  });

  it('accounts for empty iterables', () => {
    const queue = Queue.from([]);

    assert.strictEqual(queue.head, null);
    assert.strictEqual(queue.tail, null);
  });
});

describe('Queue prototype methods', () => {
  it('allows to enqueue elements to the queue', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.tail?.value, 1);

    queue.enqueue(2);
    assert.strictEqual(queue.head?.value, 1);
    assert.strictEqual(queue.tail?.value, 2);
  });

  it('allows to dequeue elements from the queue', () => {
    const queue = new Queue([1, 2]);

    const value1 = queue.dequeue();
    assert.strictEqual(value1, 1);
    assert.strictEqual(queue.size(), 1);

    const value2 = queue.dequeue();
    assert.strictEqual(value2, 2);
    assert.strictEqual(queue.size(), 0);

    const value3 = queue.dequeue();
    assert.strictEqual(value3, undefined);
  });

  it('allows to peek at the front of the queue', () => {
    const queue = Queue.from([1, 2, 3]);
    assert.strictEqual(queue.peek(), 1);
    assert.strictEqual(queue.size(), 3);
    queue.dequeue();
    assert.strictEqual(queue.peek(), 2);
  });
});
