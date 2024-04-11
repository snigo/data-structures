import type { Heap } from 'src/Heap.js';

import { stringify } from './stringify.js';

export type CompareFn<V> = (a: V, b: V) => number;
export type PriorityPredicate<V> = (a: V, b: V) => boolean;

function isNumeric(value: unknown): value is number | bigint {
  return typeof value === 'number' || typeof value === 'bigint';
}

export function defaultCompareFn<V>(a: V, b: V) {
  if (isNumeric(a) && isNumeric(b)) {
    return Number(a) - Number(b);
  }
  return stringify(a).localeCompare(stringify(b));
}

export function defaultMinPredicate<V>(a: V, b: V) {
  return defaultCompareFn(a, b) < 0;
}

export function getParentIndex(index: number) {
  return Math.floor((index - 1) / 2);
}

export function getLeftChildIndex(parentIndex: number) {
  return 2 * parentIndex + 1;
}

export function getRightChildIndex(parentIndex: number) {
  return 2 * parentIndex + 2;
}

export function swap<V>(heap: Heap<V>, i1: number, i2: number) {
  if (i1 < heap.length && i2 < heap.length) {
    const v1 = heap[i1]!;
    heap[i1] = heap[i2]!;
    heap[i2] = v1;
  }
}

export function heapifyUp<V>(heap: Heap<V>, compareFn: CompareFn<V>) {
  let index = heap.length - 1;
  let parentIndex = getParentIndex(index);
  while (parentIndex >= 0 && compareFn(heap[index]!, heap[parentIndex]!) < 0) {
    swap(heap, index, parentIndex);
    index = parentIndex;
    parentIndex = getParentIndex(index);
  }
}

export function heapifyDown<V>(heap: Heap<V>, compareFn: CompareFn<V>) {
  let index = 0;
  let nextIndex = getLeftChildIndex(index);
  while (nextIndex < heap.length) {
    const rightChildIndex = getRightChildIndex(index);
    if (
      rightChildIndex < heap.length &&
      compareFn(heap[rightChildIndex]!, heap[nextIndex]!) < 0
    ) {
      nextIndex = rightChildIndex;
    }
    if (compareFn(heap[index]!, heap[nextIndex]!) < 0) {
      return;
    }
    swap(heap, index, nextIndex);
    index = nextIndex;
    nextIndex = getLeftChildIndex(index);
  }
}
