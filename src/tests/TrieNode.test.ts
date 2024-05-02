import assert from 'node:assert';
import { describe, it } from 'node:test';
import { TrieNode } from 'src/TrieNode.js';

describe('TreeNode class initialization', () => {
  it('creates node without a parent', () => {
    const node = new TrieNode(null, 'a', 42);
    assert.strictEqual(node.parent, null);
    assert.strictEqual(node.key, 'a');
    assert.deepStrictEqual(node.values(), [42]);
  });

  it('creates node with a parent', () => {
    const parentNode = new TrieNode(null, 'a', 42);
    const childNode = new TrieNode(parentNode, 'b', 183);
    assert.strictEqual(childNode.parent, parentNode);
  });

  it('creates and checks the last index node', () => {
    const node = new TrieNode(null, 'a', 42, true);
    assert.strictEqual(node.isLastIndex(), true);
    assert.deepStrictEqual(node.getWordValues(), [42]);
  });
});

describe('TreeNode class methods', () => {
  it('sets and retrieves a child node by key', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChildNode('b', 183);
    assert.strictEqual(node.getChildNode('b')?.parent, node);
    assert.strictEqual(node.getChildNode('b')?.key, 'b');
    assert.deepStrictEqual(node.getChildNode('b')?.values(), [183]);
    assert.strictEqual(node.getChildNode('c'), undefined);
  });

  it('it appends unique values per same keys instead of overwriting them', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChildNode('b', 183);
    node.addChildNode('b', 127, false);
    node.addChildNode('b', 183);
    assert.deepStrictEqual(node.getChildNode('b')?.values(), [183, 127]);
    assert.strictEqual(node.getChildNode('b')?.isLastIndex(), false);
  });

  it('distinguishes between word and subword values', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChildNode('b', 183);
    node.addChildNode('b', 183, true);
    assert.deepStrictEqual(node.getChildNode('b')?.values(), [183, 183]);
    assert.deepStrictEqual(node.getChildNode('b')?.getWordValues(), [183]);
    assert.strictEqual(node.getChildNode('b')?.isLastIndex(), true);
  });

  it('allows to check whether it has a child with given key', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChildNode('b', 183);
    assert.strictEqual(node.hasChild('b'), true);
    assert.strictEqual(node.hasChild('a'), false);
  });

  it('allows to retrieve keys of the children aka next characters', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addChildNode('b', 183);
    node.addChildNode('c', 37);
    node.addChildNode('z', 623846);
    assert.deepStrictEqual(node.keys(), ['b', 'c', 'z']);
  });

  it('allows to add and retrieve values to itself', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addValue(183);
    assert.deepStrictEqual(node.values(), [42, 183]);
    assert.strictEqual(node.isLastIndex(), false);
    node.addValue(68, true);
    assert.deepStrictEqual(node.values(), [68, 42, 183]);
    assert.strictEqual(node.isLastIndex(), true);
  });

  it('allows to delete substring and clear word values', () => {
    const node = new TrieNode(null, 'a', 42);
    node.addValue(183);
    node.addValue(68, true);
    const r1 = node.deleteSubstringValue(42);
    const r2 = node.deleteSubstringValue(12);
    assert.strictEqual(r1, true);
    assert.strictEqual(r2, false);
    assert.deepStrictEqual(node.values(), [68, 183]);
    assert.deepStrictEqual(node.getWordValues(), [68]);
    node.clearWordValues();
    assert.deepStrictEqual(node.values(), [183]);
    assert.deepStrictEqual(node.getWordValues(), []);
  });
});
