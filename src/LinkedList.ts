import { LinkedNode } from './LinkedNode.js';

export class LinkedList<Value> {
  head: LinkedNode<Value> | null = null;

  tail: LinkedNode<Value> | null = null;

  constructor(value?: Value) {
    if (arguments.length) {
      this.head = new LinkedNode(value!);
      this.tail = this.head;
    }
  }

  static from<V>(iterable: Iterable<V>) {
    const list = new LinkedList<V>();
    for (const value of iterable) {
      list.addTail(value);
    }
    return list;
  }

  addHead(value: Value) {
    const next = this.head;
    this.head = new LinkedNode(value, next);
    if (!this.tail) {
      this.tail = this.head;
    }
    return this;
  }

  addTail(value: Value) {
    const tail = new LinkedNode(value);
    if (this.isEmpty()) {
      this.head = tail;
      this.tail = tail;
    } else {
      this.tail!.next = tail;
      this.tail = tail;
    }
    return this;
  }

  clear() {
    this.head = null;
    this.tail = null;
    return true;
  }

  contains(value: Value) {
    let node = this.head;
    if (!node) return false;
    if (!node.next || node.next === this.head) {
      return Object.is(node.value, value);
    }
    while (node.next) {
      if (Object.is(node.next.value, value)) {
        return true;
      }
      if (node.next === this.tail) {
        return false;
      }
      node = node.next;
    }
    return false;
  }

  getHead() {
    return this.head?.value;
  }

  getTail() {
    return this.tail?.value;
  }

  isCircular() {
    if (this.isEmpty()) return false;
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }

  isEmpty() {
    return this.head === null;
  }

  remove(value: Value) {
    let node = this.head;
    if (!node) return false;
    if (!node.next || node.next === this.head) {
      if (Object.is(node.value, value)) {
        this.clear();
        return true;
      }
      return false;
    }
    while (node.next) {
      if (Object.is(node.next.value, value)) {
        const removed = node.next;
        node.setNext(removed.next);
        if (this.tail === removed) {
          this.tail = node;
        }
        return true;
      }
      if (node.next === this.tail) {
        return false;
      }
      node = node.next;
    }
    return false;
  }

  removeHead() {
    const removed = this.head;
    if (!removed?.next) {
      this.clear();
    } else {
      this.head = removed.next;
    }
    return removed?.value;
  }

  removeTail() {
    let node = this.head;
    if (!node) return undefined;
    if (!node.next || node.next === this.head) {
      this.clear();
      return node.value;
    }
    while (node.next) {
      if (node.next === this.tail) {
        const removed = node.next;
        node.setNext(removed.next);
        this.tail = node;
        return removed.value;
      }
      node = node.next;
    }
    return undefined;
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      if (node === this.tail) break;
      node = node.next;
    }
    return count;
  }
}
