import { TrieNode } from './TrieNode.js';

const ROOT_KEY = '*';

export class Trie<V> {
  root = new TrieNode(null, ROOT_KEY, undefined as V, true);

  add(string: string, value?: V) {
    let node = this.root;
    const _value = arguments.length > 1 ? value : string;
    for (let i = 0; i < string.length; i++) {
      const key = string[i]!;
      const isLastIndex = i === string.length - 1;
      node = node.addChild(key, _value as V, isLastIndex);
    }
    return this;
  }

  addMany(strings: string[], value?: V) {
    strings.forEach(string => {
      this.add(string, value);
    });
    return this;
  }

  getLastNode(substring: string) {
    let node = this.root;
    for (const key of substring) {
      if (!node.hasChild(key)) return null;
      node = node.getChild(key)!;
    }
    return node;
  }

  delete(string: string) {
    let node = this.getLastNode(string);
    if (!node || !node.isComplete()) return false;
    node.deleteValue();
    while (node.parent) {
      if (!node.isLeaf()) return true;
      node.parent.deleteNode(node.key);
      node = node.parent;
    }
    return true;
  }

  clear() {
    this.root.clear();
  }

  next(substring: string) {
    const node = this.getLastNode(substring);
    if (!node) return undefined;
    return node.keys();
  }

  includes(substring: string) {
    return !!this.getLastNode(substring);
  }

  has(string: string) {
    return !!this.getLastNode(string)?.isComplete();
  }

  getValues(substring: string) {
    return this.getLastNode(substring)?.values() ?? null;
  }
}
