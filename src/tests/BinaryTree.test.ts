import assert from 'node:assert';
import { describe, it } from 'node:test';

import { BinaryNode } from 'src/BinaryNode.js';
import { BinaryTree } from 'src/BinaryTree.js';

describe('BinaryTree class constructor', () => {
  it('initializes a BinaryTree instance', () => {
    const tree = new BinaryTree();
    assert.strictEqual(tree.root, null);
  });

  it('creates a root node if provided', () => {
    const tree = new BinaryTree(42);
    assert.strictEqual(tree.isEmpty(), false);
    assert.strictEqual(tree.root?.getValue(), 42);
  });
});

describe('BinaryTree static from method', () => {
  it('allows to create BinaryTree from provided array', () => {
    const tree = BinaryTree.from([1, 2, 3]);
    assert.strictEqual(tree.root?.getValue(), 1);
    assert.strictEqual(tree.size(), 3);
  });

  it('allows to create BinaryTree from provided set', () => {
    const tree = BinaryTree.from(new Set([2, 1, 3]));
    assert.strictEqual(tree.root?.getValue(), 2);
    assert.strictEqual(tree.size(), 3);
  });

  it('allows to create BinaryTree from provided map', () => {
    const map = new Map([
      ['foo', 'bar'],
      ['baz', 'qux'],
      ['waldo', 'fred'],
    ]);
    const tree = BinaryTree.from(map);
    assert.deepStrictEqual(tree.root?.getValue(), ['foo', 'bar']);
    assert.strictEqual(tree.size(), 3);
  });
});

describe('BinaryTree prototype methods', () => {
  it('allows to add nodes and check tree size', () => {
    const tree = new BinaryTree();
    assert.strictEqual(tree.size(), 0);

    tree.add(42);
    assert.strictEqual(tree.size(), 1);

    tree.add(23).add(87);
    assert.strictEqual(tree.size(), 3);

    tree.add(236).add(13);
    assert.strictEqual(tree.root?.getValue(), 42);
    assert.strictEqual(tree.size(), 5);
  });

  it('allows to check if tree is empty or contains certain value', () => {
    const tree = new BinaryTree();
    const array = [56, 23, 87];
    assert.strictEqual(tree.isEmpty(), true);

    tree.add(array);
    assert.strictEqual(tree.isEmpty(), false);
    assert.strictEqual(tree.contains(array), true);
    assert.strictEqual(tree.contains([56, 23, 87]), false);
  });

  it('allows to delete nodes', () => {
    const array = [42, 16, 91, 34, 56, 1, 96, 45];
    const tree = BinaryTree.from(array);
    tree.delete(1);
    assert.strictEqual(tree.size(), array.length - 1);

    tree.delete(42);
    assert.strictEqual(tree.size(), array.length - 2);
    assert.strictEqual(tree.root?.getValue(), 34);

    tree.add(45);
    tree.delete(45);
    assert.strictEqual(tree.contains(45), true);
  });

  it('allows to check the height of the tree', () => {
    const tree = new BinaryTree();
    assert.strictEqual(tree.height(), -1);

    tree.add(42);
    assert.strictEqual(tree.height(), 0);

    tree.add(16).add(56);
    assert.strictEqual(tree.height(), 1);

    tree.add(3).add(9);
    assert.strictEqual(tree.height(), 3);
  });

  it('allows to execute a callback for each node in order', () => {
    const array = [42, 16, 91, 34, 56, 1, 96, 45];
    const testArray: number[] = [];
    const tree = BinaryTree.from(array);
    const cb = (v: number, n: BinaryNode<number>, t: BinaryTree<number>) => {
      testArray.push(v);
      assert.strictEqual(n instanceof BinaryNode, true);
      assert.strictEqual(t, tree);
    };
    tree.forEachInOrder(cb);
    assert.deepStrictEqual(testArray, [1, 16, 34, 42, 45, 56, 91, 96]);
  });

  it('allows to execute a callback for each node pre order', () => {
    const array = [42, 16, 91, 34, 56, 1, 96, 45];
    const testArray: number[] = [];
    const tree = BinaryTree.from(array);
    const cb = (v: number, n: BinaryNode<number>, t: BinaryTree<number>) => {
      testArray.push(v);
      assert.strictEqual(n instanceof BinaryNode, true);
      assert.strictEqual(t, tree);
    };
    tree.forEachPreOrder(cb);
    assert.deepStrictEqual(testArray, [42, 1, 16, 34, 45, 56, 91, 96]);
  });

  it('allows to execute a callback for each node post order', () => {
    const array = [42, 16, 91, 34, 56, 1, 96, 45];
    const testArray: number[] = [];
    const tree = BinaryTree.from(array);
    const cb = (v: number, n: BinaryNode<number>, t: BinaryTree<number>) => {
      testArray.push(v);
      assert.strictEqual(n instanceof BinaryNode, true);
      assert.strictEqual(t, tree);
    };
    tree.forEachPostOrder(cb);
    assert.deepStrictEqual(testArray, [1, 16, 34, 45, 56, 91, 96, 42]);
  });

  it('allows to get a sorted array of values from the tree', () => {
    const arrayNum = [42, 16, 91, 34, 56, 1, 96, 45];
    const sortedArrayNum = [...arrayNum.sort((a, b) => a - b)];
    const treeNum = BinaryTree.from(arrayNum);
    assert.deepStrictEqual(treeNum.toSortedArray(), sortedArrayNum);

    const arrayStr = ['Narf', 'Zort', 'Poit', 'Troz'];
    const sortedArrayStr = [...arrayStr.sort()];
    const treeStr = BinaryTree.from(arrayStr);
    assert.deepStrictEqual(treeStr.toSortedArray(), sortedArrayStr);
  });
});
