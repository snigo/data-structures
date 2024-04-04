import { stringify } from './utils/stringify.js';

export class BinaryNode<Value> {
  private key: string;

  value: Value;

  left: BinaryNode<Value> | null = null;

  right: BinaryNode<Value> | null = null;

  constructor(value: Value) {
    this.key = stringify(value);
    this.value = value;
  }

  isNumeric() {
    return (
      (typeof this.value === 'number' || typeof this.value === 'bigint') &&
      !Number.isNaN(this.value)
    );
  }

  compare<V>(node: BinaryNode<V>) {
    if (this.isNumeric() && node.isNumeric()) {
      if ((this.value as number | bigint) > (node.value as number | bigint)) {
        return 1;
      }
      if ((this.value as number | bigint) < (node.value as number | bigint)) {
        return -1;
      }
      return 0;
    }
    return this.key.localeCompare(node.key);
  }

  equals<V>(node: BinaryNode<V>) {
    return this.key === node.key;
  }

  strictEquals(node: BinaryNode<Value>) {
    return Object.is(this.value, node.value);
  }

  getValue() {
    return this.value;
  }

  getKey() {
    return this.key;
  }

  setValue(value: Value) {
    this.key = stringify(value);
    this.value = value;
  }
}
