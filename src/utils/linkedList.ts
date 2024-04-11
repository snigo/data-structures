import type { LinkedNode } from 'src/LinkedNode.js';

export class LinkedListIterator<Value> {
  private current: LinkedNode<Value> | null;

  constructor(head: LinkedNode<Value> | null) {
    this.current = head;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.current) {
      const result = { value: this.current.value, done: false };
      this.current = this.current.next;
      return result;
    }
    return { value: undefined, done: true };
  }
}
