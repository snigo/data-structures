export class TrieNode<V> {
  public key: string;

  private __lv = new Set<V>();

  private __rv = new Set<V>();

  parent: TrieNode<V>;

  children = new Map<string, TrieNode<V>>();

  constructor(parent: TrieNode<V>, key: string, value: V, isLastIndex = false) {
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
      this.__lv.add(value);
    } else {
      this.__rv.add(value);
    }
  }

  hasChild(key: string) {
    return this.children.has(key);
  }

  hasValue(value: V) {
    return this.__lv.has(value) || this.__rv.has(value);
  }

  strictHasValue(value: V) {
    return this.__lv.has(value);
  }

  keys() {
    return Array.from(this.children.keys());
  }

  values() {
    const values = [];
    if (this.__lv.size) {
      values.push(...this.__lv);
    }
    if (this.__rv.size) {
      values.push(...this.__rv);
    }
    return values;
  }

  isLastIndex() {
    return !!this.__lv.size;
  }

  deleteValue(value: V) {
    return this.__lv.delete(value) || this.__rv.delete(value);
  }

  getLastIndexValues() {
    return Array.from(this.__lv);
  }

  deleteLastIndexValues() {
    return this.__lv.clear();
  }

  deleteNode(key: string) {
    const node = this.getChildNode(key);
    if (node && !node.isLastIndex() && !node.children.size) {
      this.children.delete(key);
      return true;
    }
    return false;
  }
}
