import type { Graph } from 'src/Graph.js';

export type GraphTraversalCallback<N> = (node: N, graph?: Graph<N>) => void;

export function dfs<N>(
  node: N,
  graph: Graph<N>,
  cb: GraphTraversalCallback<N>,
  visited: Set<N> = new Set(),
) {
  if (!graph.has(node) || visited.has(node)) return;
  cb(node, graph);
  visited.add(node);
  graph.getAdjacentNodes(node)!.forEach(neighbor => {
    if (!visited.has(neighbor)) {
      dfs(neighbor, graph, cb, visited);
    }
  });
}
