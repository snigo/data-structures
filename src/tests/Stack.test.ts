import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Stack } from '../Stack.js';

describe('Stack class constructor', () => {
  it('initializes Stack instance with provided array', () => {
    const stack = new Stack([1, 2, 3]);
    assert.strictEqual(stack.at(0), 1);
    assert.strictEqual(stack.at(1), 2);
    assert.strictEqual(stack.at(2), 3);
    assert.strictEqual(stack.length, 3);
  });

  it('initializes Stack instance with provided set', () => {
    const stack = new Stack(new Set([1, 2, 3]));
    assert.strictEqual(stack.at(0), 1);
    assert.strictEqual(stack.at(1), 2);
    assert.strictEqual(stack.at(2), 3);
    assert.strictEqual(stack.length, 3);
  });

  it('initializes empty Stack instance', () => {
    const stack = new Stack();
    assert.strictEqual(stack.at(0), undefined);
    assert.strictEqual(stack.at(1), undefined);
    assert.strictEqual(stack.length, 0);
  });
});

describe('Stack static from method', () => {
  it('creates Stack from array', () => {
    const array = [1, 2, 3];
    const stack = Stack.from(array);

    assert.strictEqual(stack.at(0), 1);
    assert.strictEqual(stack.at(1), 2);
    assert.strictEqual(stack.at(2), 3);
  });

  it('creates Stack from set', () => {
    const set = new Set([1, 2, 3]);
    const stack = Stack.from(set);

    assert.strictEqual(stack.at(0), 1);
    assert.strictEqual(stack.at(1), 2);
    assert.strictEqual(stack.at(2), 3);
  });

  it('creates Stack from map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const stack = Stack.from(map);

    assert.deepStrictEqual(stack.at(0), ['a', 1]);
    assert.deepStrictEqual(stack.at(1), ['b', 2]);
    assert.deepStrictEqual(stack.at(2), ['c', 3]);
  });

  it('creates Stack from ArrayLike object', () => {
    (function testArrayLike(..._: number[]) {
      // eslint-disable-next-line prefer-rest-params
      const stack = Stack.from(arguments);
      assert.strictEqual(stack.at(0), 1);
      assert.strictEqual(stack.at(1), 2);
      assert.strictEqual(stack.at(2), 3);
    })(1, 2, 3);
  });

  it('accounts for empty iterables', () => {
    const stack = Stack.from([]);

    assert.strictEqual(stack.at(0), undefined);
    assert.strictEqual(stack.length, 0);
  });
});

describe('Stack prototype methods', () => {
  it('allows to clear the stack', () => {
    const stack = new Stack([1, 2, 3]);
    assert.strictEqual(stack.length, 3);
    stack.clear();
    assert.strictEqual(stack.length, 0);
  });

  it('allows to check wether stack is empty', () => {
    const stack = new Stack<number>();
    assert.strictEqual(stack.isEmpty(), true);

    stack.push(1);
    assert.strictEqual(stack.isEmpty(), false);

    stack.pop();
    assert.strictEqual(stack.isEmpty(), true);
  });

  it('allows to peek at the top of the stack', () => {
    const stack = new Stack([1, 2, 3]);
    assert.strictEqual(stack.peek(), 3);

    stack.pop();
    assert.strictEqual(stack.peek(), 2);
  });

  it('allows to check stack size', () => {
    const stack = new Stack([1, 2, 3]);
    assert.strictEqual(stack.size(), 3);

    stack.pop();
    assert.strictEqual(stack.size(), 2);

    stack.clear();
    assert.strictEqual(stack.size(), 0);
  });
});
