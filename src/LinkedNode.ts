export class LinkedNode<Value> {
  value: Value;

  // eslint-disable-next-line no-use-before-define
  next: LinkedNode<Value> | null = null;

  constructor(value: Value, next?: LinkedNode<Value> | null) {
    this.value = value;
    this.next = next ?? null;
  }

  setNext(node: LinkedNode<Value> | null) {
    this.next = node;
  }
}
