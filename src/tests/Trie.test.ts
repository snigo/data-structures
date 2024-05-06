import assert from 'node:assert';
import { describe, it } from 'node:test';
import { Trie } from 'src/Trie.js';

describe('Trie class initialization', () => {
  it('initializes a Trie class', () => {
    const trie = new Trie();
    assert.strictEqual(trie.root.key, '*');
    assert.deepStrictEqual(trie.root.values(), {
      complete: [null],
      partial: [],
    });
  });
});

describe('Trie class methods', () => {
  it('allows to add word and check if it has been added', () => {
    const trie = new Trie<number>();
    const word = 'three';
    assert.strictEqual(trie.has(word), false);
    trie.add('three', 3);
    assert.strictEqual(trie.has(word), true);
    assert.strictEqual(trie.has('four'), false);
  });

  it('allows to add many words', () => {
    const trie = new Trie<number>();
    const words = ['three', '3', 'Three', 'THREE', 'Tres'];
    trie.addMany(words, 3);
    words.forEach(word => {
      assert.strictEqual(trie.has(word), true);
    });
  });

  it('gets the last character TrieNode', () => {
    const trie = new Trie<number>();
    trie.add('three', 3);
    const node1 = trie.getLastNode('three');
    const node2 = trie.getLastNode('thre');
    const node3 = trie.getLastNode('tre');
    assert.strictEqual(node1?.isComplete(), true);
    assert.strictEqual(node2?.isComplete(), false);
    assert.strictEqual(node3, null);
  });

  it('deletes word from Trie', () => {
    const trie = new Trie<number>();
    trie.add('three', 3);
    assert.strictEqual(trie.root.isLeaf(), false);
    const r1 = trie.delete('tree');
    const r2 = trie.delete('three');
    assert.strictEqual(r1, false);
    assert.strictEqual(r2, true);
    assert.strictEqual(trie.root.isLeaf(), true);

    trie.addMany(['one', 'two', 'three'], 123);
    trie.delete('three');
    assert.strictEqual(trie.has('one'), true);
    assert.strictEqual(trie.has('two'), true);
    assert.strictEqual(trie.has('three'), false);
  });

  it('clears the Trie completely', () => {
    const trie = new Trie<number>();
    trie.addMany(['one', 'two', 'three'], 123);
    trie.clear();
    assert.strictEqual(trie.root.isLeaf(), true);
  });

  it('suggests the next characters given a substring', () => {
    const trie = new Trie<string>();
    trie.addMany(['foo', 'food', 'footer', 'foobar']);
    assert.deepStrictEqual(trie.next('f'), ['o']);
    assert.deepStrictEqual(trie.next('foo'), ['d', 't', 'b']);
    assert.deepStrictEqual(trie.next('foob'), ['a']);
  });

  it('checks if substring is included in the Trie', () => {
    const trie = new Trie<string>();
    trie.add('nest');
    assert.strictEqual(trie.includes('next'), false);
    assert.strictEqual(trie.includes('nes'), true);
    assert.strictEqual(trie.has('nes'), false);
  });

  it('retrieves values of a given substring', () => {
    const trie = new Trie<number>();
    trie.add('four', 4).add('fourteen', 14).add('fourty', 40);

    const r1 = trie.getValues('four');
    const r2 = trie.getValues('foul');
    assert.deepStrictEqual(r1?.complete, [4]);
    assert.deepStrictEqual(r1?.partial, [14, 40]);
    assert.strictEqual(r2, null);
  });

  it('keeps the reference of object-like values', () => {
    const trie = new Trie<{ a: number }>();
    trie.add('four', { a: 4 });

    const r1 = trie.getValues('fo');
    const r2 = trie.getValues('four');
    assert.strictEqual(r1?.partial[0], r2?.complete[0]);
  });

  it('allows to add multiple values for the same key', () => {
    const trie = new Trie<number>();
    trie.add('four', 4).add('four', 44).add('four', 444);
    assert.deepStrictEqual(trie.getValues('four')?.complete, [4, 44, 444]);
  });
});
