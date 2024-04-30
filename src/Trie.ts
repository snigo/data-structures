import { WORDS_MATCH_RE } from './utils/trie.js';
import { TrieNode } from './TrieNode.js';

const ROOT_KEY = '*';

export class Trie<V> {
  root = new TrieNode(null!, ROOT_KEY, undefined as V);

  static split(words: string) {
    return words.match(WORDS_MATCH_RE) ?? [];
  }

  add(word: string, value: V) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const key = word[i]!;
      const isLastIndex = i === word.length - 1;
      node.addChildNode(key, value, isLastIndex);
      node = node.getChildNode(key)!;
    }
    return this;
  }

  addMany(words: string, value: V) {
    Trie.split(words).forEach(word => {
      this.add(word, value);
    });
    return this;
  }

  getLastNode(word: string) {
    let node = this.root;
    for (const key of word) {
      if (!node.hasChild(key)) return null;
      node = node.getChildNode(key)!;
    }
    return node;
  }

  delete(word: string) {
    let node = this.getLastNode(word);
    if (!node || !node.isLastIndex()) return false;
    const values = node.getLastIndexValues();
    node.deleteLastIndexValues();
    while (node.parent) {
      // eslint-disable-next-line no-loop-func
      values.forEach(value => {
        node!.parent.deleteValue(value);
      });
      node = node.parent;
    }
    return true;
  }

  clear() {
    this.root.children.clear();
  }

  next(substring: string) {
    const node = this.getLastNode(substring);
    if (!node) return undefined;
    return node.keys();
  }

  includes(word: string) {
    return this.getLastNode(word)?.isLastIndex();
  }

  getValues(substring: string) {
    return this.getLastNode(substring)?.values() ?? [];
  }
}
