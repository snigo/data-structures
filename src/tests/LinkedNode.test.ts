import assert from 'node:assert';
import { describe, it } from 'node:test';

import { LinkedNode } from '../LinkedNode.js';

describe('LinkedNode class', () => {
  it('initializes LinkedNode instance with provided value', () => {
    const value = 1;
    const node = new LinkedNode(value);

    assert.strictEqual(node.value, value);
    assert.strictEqual(node.next, null);
  });

  it('initializes LinkedNode instance with provided value and next node', () => {
    const next = new LinkedNode(2);
    const node1 = new LinkedNode(1, next);
    const node2 = new LinkedNode(3, null);

    assert.strictEqual(node1.next, next);
    assert.strictEqual(node2.next, null);
  });

  it('accepts undefined as value', () => {
    const node = new LinkedNode(undefined);

    assert.strictEqual(node.value, undefined);
  });

  it('provides setNext method', () => {
    const next1 = new LinkedNode(2);
    const node = new LinkedNode(1);
    const next2 = new LinkedNode(3);
    node.setNext(next1);
    assert.strictEqual(node.next, next1);

    node.next = next2;
    assert.strictEqual(node.next, next2);
  });
});
