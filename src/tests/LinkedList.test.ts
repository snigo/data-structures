import assert from 'node:assert';
import { describe, it } from 'node:test';

import { LinkedList } from '../LinkedList.js';

describe('LinkedList class constructor', () => {
  it('initializes LinkedList instance with provided value', () => {
    const value = 1;
    const list = new LinkedList(value);

    assert.strictEqual(list.head?.value, value);
    assert.strictEqual(list.tail?.value, value);
  });

  it('initializes empty LinkedList instance', () => {
    const list = new LinkedList();

    assert.strictEqual(list.head, null);
    assert.strictEqual(list.tail, null);
  });
});

describe('LinkedList static from method', () => {
  it('creates LinkedList from array', () => {
    const array = [1, 2, 3];
    const list = LinkedList.from(array);

    assert.strictEqual(list.head?.value, 1);
    assert.strictEqual(list.head?.next?.value, 2);
    assert.strictEqual(list.tail?.value, 3);
  });

  it('creates LinkedList from set', () => {
    const set = new Set([1, 2, 3]);
    const list = LinkedList.from(set);

    assert.strictEqual(list.head?.value, 1);
    assert.strictEqual(list.head?.next?.value, 2);
    assert.strictEqual(list.tail?.value, 3);
  });

  it('creates LinkedList from map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const list = LinkedList.from(map);

    assert.deepStrictEqual(list.head?.value, ['a', 1]);
    assert.deepStrictEqual(list.head?.next?.value, ['b', 2]);
    assert.deepStrictEqual(list.tail?.value, ['c', 3]);
  });

  it('accounts for empty iterables', () => {
    const list = LinkedList.from([]);

    assert.strictEqual(list.head, null);
    assert.strictEqual(list.tail, null);
  });
});

describe('LinkedList prototype methods', () => {
  it('allows to add elements to the head', () => {
    const value1 = 1;
    const value2 = 2;
    const list = new LinkedList<number>();
    list.addHead(value1);
    assert.strictEqual(list.head?.value, value1);
    assert.strictEqual(list.tail?.value, value1);

    list.addHead(value2);
    assert.strictEqual(list.head?.value, value2);
    assert.strictEqual(list.tail?.value, value1);
  });

  it('allows to add elements to the tail', () => {
    const value1 = 1;
    const value2 = 2;
    const list = new LinkedList<number>();
    list.addTail(value1);
    assert.strictEqual(list.tail?.value, value1);
    assert.strictEqual(list.head?.value, value1);

    list.addTail(value2);
    assert.strictEqual(list.tail?.value, value2);
    assert.strictEqual(list.head?.value, value1);
  });

  it('allows to clear itself', () => {
    const list = LinkedList.from([1, 2, 3]);
    list.clear();
    assert.strictEqual(list.head, null);
    assert.strictEqual(list.tail, null);
  });

  it('allows to check wether it contains a value', () => {
    const list = LinkedList.from([1, 2, 3]);
    const result1 = list.contains(2);
    const result2 = list.contains(4);

    assert.strictEqual(result1, true);
    assert.strictEqual(result2, false);
  });

  it('allows to retrieve head and tail values', () => {
    const list = LinkedList.from([1, 2, 3]);
    const headValue = list.getHead();
    const tailValue = list.getTail();

    assert.strictEqual(headValue, 1);
    assert.strictEqual(tailValue, 3);
  });

  it('provides a method to check if it is circular', () => {
    const list = LinkedList.from([1, 2, 3]);
    assert.strictEqual(list.isCircular(), false);

    list.tail?.setNext(list.head);
    assert.strictEqual(list.isCircular(), true);

    list.tail?.setNext(list.head!.next);
    assert.strictEqual(list.isCircular(), true);
  });

  it('provides a method to check if it is empty', () => {
    const list = new LinkedList();
    assert.strictEqual(list.isEmpty(), true);

    list.addHead(1);
    assert.strictEqual(list.isEmpty(), false);

    list.clear();
    assert.strictEqual(list.isEmpty(), true);
  });

  it('allows to remove found value', () => {
    const list = LinkedList.from([1, 2, 3, 1, 2, 3]);
    const result1 = list.remove(3);
    const result2 = list.remove(4);
    assert.strictEqual(result1, true);
    assert.strictEqual(result2, false);
    assert.strictEqual(list.getTail(), 3);
    list.remove(3);
    assert.strictEqual(list.getTail(), 2);

    list.tail?.setNext(list.head);
    const result3 = list.remove(4);
    assert.strictEqual(result3, false);
  });

  it('allows to remove head value', () => {
    const list = LinkedList.from([1, 2, 3]);
    const value1 = list.removeHead();
    assert.strictEqual(value1, 1);
    assert.strictEqual(list.getHead(), 2);

    list.removeHead();
    assert.strictEqual(list.head, list.tail);

    list.removeHead();
    assert.strictEqual(list.head, null);
    assert.strictEqual(list.tail, null);

    const value2 = list.removeHead();
    assert.strictEqual(value2, undefined);
  });

  it('allows to remove tail value', () => {
    const list = LinkedList.from([1, 2, 3]);
    list.tail?.setNext(list.head);
    const value1 = list.removeTail();
    assert.strictEqual(value1, 3);
    assert.strictEqual(list.getTail(), 2);
    assert.strictEqual(list.tail?.next, list.head);

    list.removeTail();
    assert.strictEqual(list.head, list.tail);
    assert.strictEqual(list.tail?.next, list.head);

    list.removeTail();
    assert.strictEqual(list.head, null);
    assert.strictEqual(list.tail, null);

    const value2 = list.removeTail();
    assert.strictEqual(value2, undefined);
  });

  it('counts number of elements in the list', () => {
    const list = LinkedList.from([1, 2, 3]);
    assert.strictEqual(list.size(), 3);

    list.tail?.setNext(list.head);
    assert.strictEqual(list.size(), 3);

    list.removeHead();
    assert.strictEqual(list.size(), 2);

    list.clear();
    assert.strictEqual(list.size(), 0);
  });
});
