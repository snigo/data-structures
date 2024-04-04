import assert from 'node:assert';
import { describe, it } from 'node:test';

import { BinaryNode } from 'src/BinaryNode.js';

import {
  compareResults,
  equalityResults,
  valueKeyPairs,
} from './BinaryNode.testdata.js';

describe('BinaryNode class constructor', () => {
  it('initializes node with given value providing a string key', () => {
    valueKeyPairs.forEach(([value, key]) => {
      const node = new BinaryNode(value);
      assert.strictEqual(node.value, value);
      assert.strictEqual(node.getKey(), key);
    });
  });
});

describe('BinaryNode prototype methods', () => {
  it('allows to check whether the node is numeric', () => {
    const node1 = new BinaryNode(42);
    const node2 = new BinaryNode('42');
    assert.strictEqual(node1.isNumeric(), true);
    assert.strictEqual(node2.isNumeric(), false);
  });

  it('allows to compare nodes', () => {
    compareResults.forEach(([a, b, result]) => {
      const nodeA = new BinaryNode(a);
      const nodeB = new BinaryNode(b);
      assert.strictEqual(nodeA.compare(nodeB), result);
    });
  });

  it('allows to check whether the nodes equal or strict equal', () => {
    equalityResults.forEach(([a, b, equalsResult, strictEqualsResult]) => {
      const nodeA = new BinaryNode(a);
      const nodeB = new BinaryNode(b);
      assert.strictEqual(nodeA.equals(nodeB), equalsResult);
      assert.strictEqual(nodeA.strictEquals(nodeB), strictEqualsResult);
    });
  });

  it('allows to get and set value as well as get key', () => {
    const node = new BinaryNode(42);
    assert.strictEqual(node.getValue(), 42);
    assert.strictEqual(node.getKey(), '42');

    node.setValue(183);
    assert.strictEqual(node.getValue(), 183);
    assert.strictEqual(node.getKey(), '183');
  });
});
