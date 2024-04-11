import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Graph } from 'src/Graph.js';

describe('Graph class', () => {
  it('allows to add and check existance of nodes', () => {
    const graph = new Graph<number>();
    assert.strictEqual(graph.has(1), false);
    graph.addNode(1);
    assert.strictEqual(graph.has(1), true);
  });

  it('allows to remove nodes from the graph', () => {
    const graph = new Graph<number>();
    graph.addNode(1).addNode(3).addEdge(3, 1);
    assert.strictEqual(graph.removeNode(1), true);
    assert.strictEqual(graph.removeNode(1), false);
    assert.strictEqual(graph.getOutDegree(3), 0);
  });

  it('allows to add and remove edges between nodes', () => {
    const graph = new Graph<number>();
    graph.addNode(1).addNode(2).addNode(3);
    graph.addEdge(1, 2);
    assert.strictEqual(graph.isAdjacent(1, 2), true);
    assert.strictEqual(graph.isAdjacent(2, 1), false);
    graph.removeEdge(1, 2);
    assert.strictEqual(graph.isAdjacent(1, 2), false);

    graph.addEdge(3, 3);
    assert.strictEqual(graph.isAdjacent(3, 3), true);
    graph.removeEdge(3, 3);
    assert.strictEqual(graph.isAdjacent(3, 3), false);

    graph.addEdge(2, 4);
    assert.strictEqual(graph.has(4), true);
    assert.strictEqual(graph.isAdjacent(2, 4), true);
  });

  it('allows to get adjacent nodes of a node', () => {
    const graph = new Graph<number>();
    graph.addNode(1).addNode(2).addNode(3).addNode(4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 4);
    assert.deepStrictEqual(graph.getAdjacentNodes(1), [2, 4]);
    assert.deepStrictEqual(graph.getAdjacentNodes(2), []);
    assert.strictEqual(graph.getAdjacentNodes(5), undefined);
  });

  it('allows to get in and out degrees of a node', () => {
    const graph = new Graph<number>();
    graph.addNode(1).addNode(2).addNode(3).addNode(4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 4);
    graph.addEdge(2, 3);
    assert.strictEqual(graph.getInDegree(1), 0);
    assert.strictEqual(graph.getOutDegree(1), 2);
    assert.strictEqual(graph.getInDegree(2), 1);
    assert.strictEqual(graph.getOutDegree(2), 1);
  });

  it('allows to traverse graph in DFS fashion', () => {
    const graph = new Graph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 4);
    graph.addEdge(2, 3);
    graph.addEdge(4, 1);
    graph.addEdge(4, 5);
    const result: number[] = [];
    graph.forEachDFS(1, node => {
      result.push(node);
    });
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5]);
  });

  it('allows to traverse graph in BFS fashion', () => {
    const graph = new Graph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 4);
    graph.addEdge(2, 3);
    graph.addEdge(4, 1);
    graph.addEdge(4, 5);
    const result: number[] = [];
    graph.forEachBFS(1, node => {
      result.push(node);
    });
    assert.deepStrictEqual(result, [1, 2, 4, 3, 5]);
  });

  it('allows to iterate over adjacency list entries', () => {
    const graph = new Graph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(1, 5);
    const iterator = graph.entries();
    const value1 = iterator.next().value;
    assert.strictEqual(value1[0], 1);
    assert.strictEqual(value1[1].size, 4);
    const value2 = iterator.next().value;
    assert.strictEqual(value2[0], 2);
    assert.strictEqual(value2[1].size, 0);
  });
});
