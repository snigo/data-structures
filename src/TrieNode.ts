export class TrieNode<V> {
  public key: string;

  private w = new Set<V>();

  private s = new Set<V>();

  parent: TrieNode<V> | null;

  children = new Map<string, TrieNode<V>>();

  constructor(
    parent: TrieNode<V> | null,
    key: string,
    value: V,
    isLastIndex = false,
  ) {
    if (key.length !== 1) {
      throw new TypeError('Key of TrieNode must be a single character');
    }
    this.parent = parent;
    this.key = key;
    this.addValue(value, isLastIndex);
  }

  getChildNode(key: string) {
    return this.children.get(key);
  }

  addChildNode(key: string, value: V, isLastIndex = false) {
    const childnode = this.getChildNode(key);
    if (!childnode) {
      this.children.set(key, new TrieNode(this, key, value, isLastIndex));
    } else {
      childnode.addValue(value, isLastIndex);
    }
    return this;
  }

  addValue(value: V, isLastIndex = false) {
    if (isLastIndex) {
      this.w.add(value);
    } else {
      this.s.add(value);
    }
  }

  hasChild(key: string) {
    return this.children.has(key);
  }

  keys() {
    return Array.from(this.children.keys());
  }

  values() {
    const values = [];
    if (this.w.size) {
      values.push(...this.w);
    }
    if (this.s.size) {
      values.push(...this.s);
    }
    return values;
  }

  isLastIndex() {
    return !!this.w.size;
  }

  deleteSubstringValue(value: V) {
    return this.s.delete(value);
  }

  getWordValues() {
    return Array.from(this.w);
  }

  clearWordValues() {
    return this.w.clear();
  }
}
