/**
 * BFS — Breadth-First Road Traversal
 * Explores roads layer by layer from a starting intersection.
 * Each step records the queue state, current node, visited set.
 */
export function generateBFSSteps(graph, startId) {
  const steps = [];
  const visited = new Set();
  const queue = [startId];
  visited.add(startId);
  const visitOrder = [];

  steps.push({
    visited: [],
    current: null,
    frontier: [startId],
    path: [],
    distances: {},
    edges: [],
    description: `Starting BFS from intersection "${graph.nodes.find(n => n.id === startId)?.label || startId}"...`,
    pseudocodeLine: 0,
  });

  while (queue.length > 0) {
    const current = queue.shift();
    visitOrder.push(current);

    steps.push({
      visited: [...visitOrder],
      current,
      frontier: [...queue],
      path: [...visitOrder],
      distances: {},
      edges: getVisitedEdges(graph, visitOrder),
      description: `Visiting intersection "${graph.nodes.find(n => n.id === current)?.label || current}" — exploring all connected roads...`,
      pseudocodeLine: 3,
    });

    const neighbors = getNeighbors(graph, current);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          visited: [...visitOrder],
          current,
          frontier: [...queue],
          path: [...visitOrder],
          distances: {},
          edges: getVisitedEdges(graph, [...visitOrder, neighbor]),
          description: `Discovered new intersection "${graph.nodes.find(n => n.id === neighbor)?.label || neighbor}" — added to exploration queue.`,
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
    description: `BFS complete! Explored ${visitOrder.length} intersections. All reachable roads traversed. ✅`,
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
