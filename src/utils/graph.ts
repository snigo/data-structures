import type { Graph } from 'src/Graph.js';

export type GraphTraversalCallback<N> = (node: N, graph: Graph<N>) => void;

export function dfs<N>(
  graph: Graph<N>,
  node: N,
  cb: GraphTraversalCallback<N>,
  visited: Set<N> = new Set(),
) {
  if (!graph.has(node) || visited.has(node)) return;
  cb(node, graph);
  visited.add(node);
  graph.getAdjacentNodes(node)!.forEach(neighbor => {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, cb, visited);
    }
  });
}

export function dfsbt<N>(
  graph: Graph<N>,
  node: N,
  cb: GraphTraversalCallback<N>,
  visited: Set<N> = new Set(),
) {
  if (!graph.has(node) || visited.has(node)) return;
  visited.add(node);
  graph.getAdjacentNodes(node)!.forEach(neighbor => {
    if (!visited.has(neighbor)) {
      dfsbt(graph, neighbor, cb, visited);
    }
  });
  cb(node, graph);
}

export function isCyclic<N>(
  graph: Graph<N>,
  source: N,
  target: N,
  visited = new Set<N>(),
) {
  if (source === target) return true;
  if (!graph.has(source) || !graph.has(target)) return false;
  if (graph.isAdjacent(target, source)) return true;
  visited.add(target);
  const neighbors = graph.getAdjacentNodes(target);
  if (!neighbors?.length) return false;
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor) && isCyclic(graph, source, neighbor, visited)) {
      return true;
    }
  }
  return false;
}

export class CycleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CycleError';
  }
}
