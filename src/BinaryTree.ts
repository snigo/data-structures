import {
  type BinaryTreeCallbackFn,
  deleteNode,
  insertNode,
  searchNode,
  traverseInOrder,
  traversePostOrder,
  traversePreOrder,
} from './utils/binaryTree.js';
import { BinaryNode } from './BinaryNode.js';

export class BinaryTree<Value> {
  root: BinaryNode<Value> | null = null;

  constructor(rootValue?: Value) {
    if (arguments.length) {
      this.root = new BinaryNode(rootValue!);
    }
  }

  static from<V>(values: Iterable<V>) {
    const tree = new BinaryTree<V>();
    for (const value of values) {
      tree.add(value);
    }
    return tree;
  }

  add(value: Value) {
    const node = new BinaryNode(value);
    if (this.isEmpty()) {
      this.root = node;
      return this;
    }
    insertNode(this.root!, node);
    return this;
  }

  isEmpty() {
    return !this.root;
  }

  contains(value: Value) {
    const node = new BinaryNode(value);
    return searchNode(this.root, node);
  }

  delete(value: Value) {
    const node = new BinaryNode(value);
    this.root = deleteNode(this.root, node);
  }

  height(node = this.root): number {
    if (!node) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  size(node = this.root): number {
    if (!node) return 0;
    return this.size(node.left) + this.size(node.right) + 1;
  }

  forEachInOrder(cb: BinaryTreeCallbackFn<Value>) {
    traverseInOrder(this.root, this, cb);
  }

  forEachPreOrder(cb: BinaryTreeCallbackFn<Value>) {
    traversePreOrder(this.root, this, cb);
  }

  forEachPostOrder(cb: BinaryTreeCallbackFn<Value>) {
    traversePostOrder(this.root, this, cb);
  }

  toSortedArray() {
    const result: Value[] = [];
    this.forEachInOrder(value => {
      result.push(value);
    });
    return result;
  }
}
