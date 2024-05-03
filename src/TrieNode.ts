interface TrieNodeValues<V> {
  complete: V | undefined;
  partial: V[];
}

export class TrieNode<V> {
  public key: string;

  public parent: TrieNode<V> | null;

  private children = new Map<string, TrieNode<V>>();

  private value: V | undefined = undefined;

  private partial = new Set<V>();

  constructor(
    parent: TrieNode<V> | null,
    key: string,
    value: V,
    complete = false,
  ) {
    if (key.length !== 1) {
      throw new TypeError('Key of TrieNode must be a single character');
    }
    this.parent = parent;
    this.key = key;
    this.addValue(value, complete);
  }

  isLeaf() {
    return !this.children.size;
  }

  isEmpty() {
    this.value === undefined && !this.partial.size;
  }

  size() {
    return this.children.size;
  }

  clear() {
    this.children.clear();
  }

  addChild(key: string, value: V, isLastIndex = false) {
    let childnode = this.getChild(key);
    if (!childnode) {
      childnode = new TrieNode(this, key, value, isLastIndex);
      this.children.set(key, childnode);
    } else {
      childnode.addValue(value, isLastIndex);
    }
    return childnode;
  }

  getChild(key: string) {
    return this.children.get(key);
  }

  hasChild(key: string) {
    return this.children.has(key);
  }

  isComplete() {
    return this.value !== undefined;
  }

  addValue(value: V, complete = false) {
    if (complete) {
      this.value = value;
    } else {
      this.partial.add(value);
    }
    return this;
  }

  getCompleteValue() {
    return this.value;
  }

  keys() {
    return Array.from(this.children.keys());
  }

  values(): TrieNodeValues<V> {
    return {
      complete: this.value,
      partial: Array.from(this.partial),
    };
  }

  deleteNode(key: string) {
    return this.children.delete(key);
  }

  deleteValue() {
    this.value = undefined;
  }

  deletePartialValue(value: V) {
    return this.partial.delete(value);
  }
}
