import type { BinaryNode } from 'src/BinaryNode.js';
import type { BinaryTree } from 'src/BinaryTree.js';

export type BinaryTreeCallbackFn<V> = (
  value: V,
  node?: BinaryNode<V>,
  tree?: BinaryTree<V>,
) => void;

export function insertNode<Value>(
  root: BinaryNode<Value>,
  node: BinaryNode<Value>,
) {
  if (node.compare(root) < 0) {
    if (!root.left) {
      root.left = node;
      return true;
    }
    return insertNode(root.left, node);
  }
  if (!root.right) {
    root.right = node;
    return true;
  }
  return insertNode(root.right, node);
}

export function searchNode<Value>(
  root: BinaryNode<Value> | null,
  node: BinaryNode<Value>,
) {
  if (!root) return false;
  if (node.compare(root) < 0) {
    return searchNode(root.left, node);
  }
  if (node.compare(root) > 0 || !node.strictEquals(root)) {
    return searchNode(root.right, node);
  }
  return true;
}

function findMax<Value>(root: BinaryNode<Value>) {
  let node = root;
  while (node.right) {
    node = node.right;
  }
  return node;
}

export function deleteNode<Value>(
  root: BinaryNode<Value> | null,
  node: BinaryNode<Value>,
) {
  if (!root) return null;
  if (node.compare(root) < 0) {
    root.left = deleteNode(root.left, node);
    return root;
  }
  if (
    node.compare(root) > 0 ||
    (!node.compare(root) && !node.strictEquals(root))
  ) {
    root.right = deleteNode(root.right, node);
    return root;
  }
  if (!root.left) return root.right;
  if (!root.right) return root.left;
  const deepestLeft = findMax(root.left);
  root.setValue(deepestLeft.value);
  root.left = deleteNode(root.left, deepestLeft);
  return root;
}

export function traverseInOrder<Value>(
  node: BinaryNode<Value> | null,
  tree: BinaryTree<Value>,
  cb: BinaryTreeCallbackFn<Value>,
) {
  if (node) {
    traverseInOrder(node.left, tree, cb);
    cb(node.value, node, tree);
    traverseInOrder(node.right, tree, cb);
  }
}

export function traversePreOrder<Value>(
  node: BinaryNode<Value> | null,
  tree: BinaryTree<Value>,
  cb: BinaryTreeCallbackFn<Value>,
) {
  if (node) {
    cb(node.value, node, tree);
    traverseInOrder(node.left, tree, cb);
    traverseInOrder(node.right, tree, cb);
  }
}

export function traversePostOrder<Value>(
  node: BinaryNode<Value> | null,
  tree: BinaryTree<Value>,
  cb: BinaryTreeCallbackFn<Value>,
) {
  if (node) {
    traverseInOrder(node.left, tree, cb);
    traverseInOrder(node.right, tree, cb);
    cb(node.value, node, tree);
  }
}
