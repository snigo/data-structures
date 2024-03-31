export class Stack<Value> extends Array<Value> {
  constructor(iterable?: Iterable<Value>) {
    super();
    if (iterable) {
      for (const value of iterable) {
        this.push(value);
      }
    }
  }

  isEmpty() {
    return !this.length;
  }

  peek() {
    return this.at(-1);
  }

  size() {
    return this.length;
  }
}
