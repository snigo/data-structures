import { CycleError, dfsbt, isCyclic } from './utils/graph.js';
import { Graph } from './Graph.js';
import { Stack } from './Stack.js';

export class AcyclicGraph<N> extends Graph<N> {
  override addEdge(sourceNode: N, targerNode: N): boolean {
    if (isCyclic(this, sourceNode, targerNode)) {
      throw new CycleError('Adding edge creates a cycle');
    }
    return super.addEdge(sourceNode, targerNode);
  }

  toSorted(sourceNode?: N) {
    const stack = new Stack<N>();
    const visited = new Set<N>();
    const cb = (node: N) => stack.push(node);
    if (arguments.length) {
      dfsbt(this, sourceNode!, cb, visited);
    } else {
      Array.from(this.entries()).forEach(([node]) => {
        dfsbt(this, node, cb, visited);
      });
    }
    return Array.from(stack).reverse();
  }
}
