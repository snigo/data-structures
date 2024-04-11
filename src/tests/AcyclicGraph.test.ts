import assert from 'node:assert';
import { describe, it } from 'node:test';
import { AcyclicGraph } from 'src/AcyclicGraph.js';
import { CycleError } from 'src/utils/graph.js';

describe('AcyclicGraph class', () => {
  it('allows to add and check existance of nodes', () => {
    const dag = new AcyclicGraph<string>();
    dag.addNode('A').addNode('B').addNode('C');
    dag.addEdge('A', 'B');
    dag.addEdge('A', 'C');
    dag.addEdge('B', 'C');
    assert.strictEqual(dag.has('A'), true);
    assert.strictEqual(dag.has('B'), true);
    assert.strictEqual(dag.has('C'), true);
  });

  it('throws if cycle is detected', () => {
    const dag = new AcyclicGraph<string>();
    dag.addNode('A').addNode('B').addNode('C');
    dag.addEdge('A', 'B');
    dag.addEdge('A', 'C');
    dag.addEdge('B', 'C');
    assert.throws(() => dag.addEdge('C', 'A'), CycleError);
  });

  it('outputs an array of topological ordering of the nodes', () => {
    const dag = new AcyclicGraph<string>();
    dag.addEdge('A', 'B');
    dag.addEdge('B', 'C');
    dag.addEdge('E', 'A');
    dag.addEdge('B', 'D');
    dag.addEdge('C', 'D');
    assert.deepStrictEqual(dag.toSorted(), ['E', 'A', 'B', 'C', 'D']);
    assert.deepStrictEqual(dag.toSorted('A'), ['A', 'B', 'C', 'D']);
    assert.deepStrictEqual(dag.toSorted('B'), ['B', 'C', 'D']);
  });
});
