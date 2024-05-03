import assert from 'node:assert';
import { describe, it } from 'node:test';
import { TrieNode } from 'src/TrieNode.js';

describe('TreeNode class initialization', () => {
  it('creates node without a parent', () => {
    const node = new TrieNode(null, 'a', 42);
    assert.strictEqual(node.parent, null);
    assert.strictEqual(node.key, 'a');
    assert.deepStrictEqual(node.values().partial, [42]);
  });

  it('creates node with a parent', () => {
    const parentNode = new TrieNode(null, 'a', 42);
    const childNode = new TrieNode(parentNode, 'b', 183);
    assert.strictEqual(childNode.parent, parentNode);
  });

  it('creates and checks the last index node', () => {
    const node = new TrieNode(null, 'a', 42, true);
    assert.strictEqual(node.isComplete(), true);
    assert.deepStrictEqual(node.getCompleteValue(), 42);
  });
});

describe('TreeNode class methods', () => {
  it('adds and retrieves a child node by key', () => {
    const node = new TrieNode(null, 'a', 42);
    const childnode = node.addChild('b', 183);
    assert.strictEqual(childnode.parent, node);
    assert.strictEqual(childnode.key, 'b');
    assert.deepStrictEqual(childnode.values().partial, [183]);
    assert.strictEqual(node.getChild('c'), undefined);
  });

  it('checks if node is a leaf', () => {
    const node = new TrieNode(null, 'a', 42);
    assert.strictEqual(node.isLeaf(), true);
    node.addChild('b', 183);
    assert.strictEqual(node.isLeaf(), false);
  });

  it('it appends unique partial values per same keys instead of overwriting them', () => {
    const node = new TrieNode(null, 'a', 42);
    const childnode1 = node.addChild('b', 183);
    const childnode2 = node.addChild('b', 127, false);
    const childnode3 = node.addChild('b', 183);
    assert.strictEqual(childnode1, childnode2);
    assert.strictEqual(childnode2, childnode3);
    assert.deepStrictEqual(childnode1.values().partial, [183, 127]);
    assert.strictEqual(childnode1.isComplete(), false);
  });

  it('distinguishes between word and subword values', () => {
    const node = new TrieNode(null, 'a', 42);
    const childnode = node.addChild('b', 183);
    node.addChild('b', 183, true);
    assert.deepStrictEqual(childnode.values(), {
      complete: 183,
      partial: [183],
    });
    assert.deepStrictEqual(childnode.getCompleteValue(), 183);
    assert.strictEqual(childnode.isComplete(), true);
  });

  it('allows to check whether it has a child with given key', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChild('b', 183);
    assert.strictEqual(node.hasChild('b'), true);
    assert.strictEqual(node.hasChild('a'), false);
  });

  it('allows to retrieve keys of the children aka next characters', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChild('b', 183);
    node.addChild('c', 37);
    node.addChild('z', 623846);
    assert.deepStrictEqual(node.keys(), ['b', 'c', 'z']);
  });

  it('allows to add and retrieve values to itself', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addValue(183);
    assert.deepStrictEqual(node.values().partial, [42, 183]);
    assert.strictEqual(node.isComplete(), false);
    node.addValue(68, true);
    assert.deepStrictEqual(node.values(), {
      complete: 68,
      partial: [42, 183],
    });
    assert.strictEqual(node.isComplete(), true);
  });

  it('allows to delete partial and complete values', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addValue(183);
    node.addValue(68, true);
    const r1 = node.deletePartialValue(42);
    const r2 = node.deletePartialValue(12);
    assert.strictEqual(r1, true);
    assert.strictEqual(r2, false);
    assert.deepStrictEqual(node.values().partial, [183]);
    assert.deepStrictEqual(node.values().complete, 68);
    assert.deepStrictEqual(node.getCompleteValue(), 68);
    node.deleteValue();
    assert.deepStrictEqual(node.values().partial, [183]);
    assert.deepStrictEqual(node.values().complete, undefined);
    assert.deepStrictEqual(node.getCompleteValue(), undefined);
  });
});
