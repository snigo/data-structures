import { defaultMinPredicate, type PriorityPredicate } from './utils/heap.js';
import { Heap } from './Heap.js';

export class PriorityQueue<V> extends Heap<V> {
  constructor(priorityPredicate: PriorityPredicate<V> = defaultMinPredicate) {
    super((a: V, b: V) => (priorityPredicate(a, b) ? -1 : 1));
  }

  static override from<I>(arrayLike: ArrayLike<I>) {
    const heap = new PriorityQueue<I>();
    const items = Array.from(arrayLike);
    heap.push(...items);
    return heap;
  }

  enqueue(...items: V[]) {
    this.push(...items);
    return this;
  }

  dequeue() {
    return this.pop();
  }

  updatePriority(priorityPredicate: PriorityPredicate<V>) {
    super.updateComparator((a: V, b: V) => (priorityPredicate(a, b) ? -1 : 1));
  }
}
