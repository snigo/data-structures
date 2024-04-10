export class Stack<Value> extends Array<Value> {
  constructor(iterable?: Iterable<Value>) {
    super();
    if (iterable) {
      for (const value of iterable) {
        this.push(value);
      }
    }
  }

  static override from<V>(arrayLike: ArrayLike<V> | Iterable<V>) {
    return new Stack(Array.from(arrayLike));
  }

  clear() {
    this.length = 0;
  }

  isEmpty() {
    return !this.length;
  }

  peek() {
    return this[this.length - 1];
  }

  size() {
    return this.length;
  }
}
