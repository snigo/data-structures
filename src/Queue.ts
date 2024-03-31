import { LinkedList } from './LinkedList.js';

export class Queue<Value> extends LinkedList<Value> {
  constructor(iterable?: Iterable<Value>) {
    super();
    if (iterable) {
      for (const value of iterable) {
        this.enqueue(value);
      }
    }
  }

  static override from<V>(iterable: Iterable<V>) {
    return new Queue(iterable);
  }

  enqueue(value: Value) {
    return this.addTail(value);
  }

  dequeue() {
    return this.removeHead();
  }

  peek() {
    return this.getHead();
  }
}
