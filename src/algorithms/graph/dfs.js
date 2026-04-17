/**
 * DFS — Depth-First Road Traversal
 * Explores one road path deeply before backtracking.
 * Uses stack-based approach for step generation.
 */
export function generateDFSSteps(graph, startId) {
  const steps = [];
  const visited = new Set();
  const visitOrder = [];
  const stack = [startId];

  steps.push({
    visited: [],
    current: null,
    frontier: [startId],
    path: [],
    distances: {},
    edges: [],
    description: `Starting DFS from intersection "${graph.nodes.find(n => n.id === startId)?.label || startId}"...`,
    pseudocodeLine: 0,
  });

  while (stack.length > 0) {
    const current = stack.pop();

    if (visited.has(current)) continue;

    visited.add(current);
    visitOrder.push(current);

    steps.push({
      visited: [...visitOrder],
      current,
      frontier: [...stack],
      path: [...visitOrder],
      distances: {},
      edges: getVisitedEdges(graph, visitOrder),
      description: `Diving into intersection "${graph.nodes.find(n => n.id === current)?.label || current}" — going deep on this road...`,
      pseudocodeLine: 3,
    });

    const neighbors = getNeighbors(graph, current);

    // Push in reverse order so first neighbor is processed first (stack is LIFO)
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        stack.push(neighbor);

        steps.push({
          visited: [...visitOrder],
          current,
          frontier: [...stack],
          path: [...visitOrder],
          distances: {},
          edges: getVisitedEdges(graph, visitOrder),
          description: `Found road to "${graph.nodes.find(n => n.id === neighbor)?.label || neighbor}" — stacked for exploration.`,
          pseudocodeLine: 5,
        });
      }
    }
  }

  steps.push({
    visited: [...visitOrder],
    current: null,
    frontier: [],
    path: [...visitOrder],
    distances: {},
    edges: getVisitedEdges(graph, visitOrder),
    description: `DFS complete! Explored ${visitOrder.length} intersections by going depth-first. ✅`,
    pseudocodeLine: 7,
  });

  return steps;
}

function getNeighbors(graph, nodeId) {
  const neighbors = [];
  for (const edge of graph.edges) {
    if (edge.from === nodeId && !neighbors.includes(edge.to)) {
      neighbors.push(edge.to);
    }
    if (edge.to === nodeId && !neighbors.includes(edge.from)) {
      neighbors.push(edge.from);
    }
  }
  return neighbors;
}

function getVisitedEdges(graph, visitedNodes) {
  return graph.edges.filter(
    (e) => visitedNodes.includes(e.from) && visitedNodes.includes(e.to)
  );
}
