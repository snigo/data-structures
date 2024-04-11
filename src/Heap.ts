import {
  type CompareFn,
  defaultCompareFn,
  getLeftChildIndex,
  getParentIndex,
  getRightChildIndex,
  heapifyDown,
  heapifyUp,
} from './utils/heap.js';

export class Heap<V> extends Array<V> {
  private compareFn: CompareFn<V>;

  constructor(compareFn: CompareFn<V> = defaultCompareFn) {
    super();
    this.compareFn = compareFn;
  }

  static override from<I>(arrayLike: ArrayLike<I>) {
    const heap = new Heap<I>();
    const items = Array.from(arrayLike);
    heap.push(...items);
    return heap;
  }

  parent(index: number) {
    return this[getParentIndex(index)];
  }

  leftChild(index: number) {
    return this[getLeftChildIndex(index)];
  }

  rightChild(index: number) {
    return this[getRightChildIndex(index)];
  }

  override push(...items: V[]): number {
    items.forEach(item => {
      super.push(item);
      heapifyUp(this, this.compareFn);
    });
    return this.length;
  }

  override pop() {
    if (this.length < 2) return super.pop();
    const top = this[0]!;
    this[0] = super.pop()!;
    heapifyDown(this, this.compareFn);
    return top;
  }

  peek() {
    return this[0];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return !this.length;
  }

  updateComparator(compareFn: CompareFn<V>) {
    this.compareFn = compareFn;
  }
}
