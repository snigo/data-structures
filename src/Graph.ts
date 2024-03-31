import { Queue } from './Queue.js';

type GraphTraversalCallback<N> = (node: N, graph?: Graph<N>) => void;

function dfs<N>(
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

export class Graph<N> {
  private nodes = new Map<N, Set<N>>();

  addNode(node: N) {
    if (!this.has(node)) {
      this.nodes.set(node, new Set());
    }
    return this;
  }

  removeNode(node: N) {
    if (!this.has(node)) return false;
    for (const [, adjacentNodes] of this.nodes.entries()) {
      adjacentNodes.delete(node);
    }
    return this.nodes.delete(node);
  }

  addEdge(sourceNode: N, targerNode: N) {
    if (!this.has(sourceNode)) {
      this.addNode(sourceNode);
    }
    if (!this.has(targerNode)) {
      this.addNode(targerNode);
    }
    const adjacentNodes = this.nodes.get(sourceNode)!;
    if (adjacentNodes.has(targerNode)) return false;
    adjacentNodes.add(targerNode);
    return true;
  }

  removeEdge(sourceNode: N, targerNode: N) {
    const adjacentNodes = this.nodes.get(sourceNode);
    if (!adjacentNodes) return false;
    return adjacentNodes.delete(targerNode);
  }

  has(node: N) {
    return this.nodes.has(node);
  }

  getAdjacentNodes(node: N) {
    const adjacentNodes = this.nodes.get(node);
    if (!adjacentNodes) return undefined;
    return Array.from(adjacentNodes);
  }

  isAdjacent(sourceNode: N, targerNode: N) {
    const adjacentNodes = this.nodes.get(sourceNode);
    if (!adjacentNodes) return false;
    return adjacentNodes.has(targerNode);
  }

  getInDegree(node: N) {
    let inDegree = 0;
    for (const [, adjacentNodes] of this.nodes.entries()) {
      if (adjacentNodes.has(node)) {
        inDegree++;
      }
    }
    return inDegree;
  }

  getOutDegree(node: N) {
    return this.nodes.get(node)?.size ?? 0;
  }

  forEachDFS(node: N, cb: GraphTraversalCallback<N>) {
    dfs(node, this, cb);
  }

  forEachBFS(node: N, cb: GraphTraversalCallback<N>) {
    const queue = new Queue([node]);
    const visited = new Set<N>([node]);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue()!;
      cb(currentNode, this);
      this.getAdjacentNodes(node)?.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.enqueue(neighbor);
        }
      });
    }
  }
}
