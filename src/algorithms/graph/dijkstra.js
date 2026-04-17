/**
 * Dijkstra's Algorithm — Shortest Path Navigation
 * Finds the shortest path through weighted city roads (traffic conditions).
 * Tracks distances, priority queue, relaxation, and final path.
 */
export function generateDijkstraSteps(graph, startId, endId) {
  const steps = [];
  const distances = {};
  const previous = {};
  const visited = new Set();
  const unvisited = new Set();

  // Initialize
  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  }
  distances[startId] = 0;

  const startLabel = graph.nodes.find(n => n.id === startId)?.label || startId;
  const endLabel = graph.nodes.find(n => n.id === endId)?.label || endId;

  steps.push({
    visited: [],
    current: null,
    frontier: [...unvisited],
    path: [],
    distances: { ...distances },
    previous: { ...previous },
    edges: [],
    relaxedEdge: null,
    shortestPath: [],
    description: `Starting Dijkstra from "${startLabel}" to "${endLabel}" — finding the fastest route through traffic...`,
    pseudocodeLine: 0,
  });

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let current = null;
    let minDist = Infinity;
    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDist) {
        minDist = distances[nodeId];
        current = nodeId;
      }
    }

    if (current === null || distances[current] === Infinity) break;

    unvisited.delete(current);
    visited.add(current);

    const currentLabel = graph.nodes.find(n => n.id === current)?.label || current;

    steps.push({
      visited: [...visited],
      current,
      frontier: [...unvisited].filter(id => distances[id] < Infinity),
      path: [],
      distances: { ...distances },
      previous: { ...previous },
      edges: getVisitedEdges(graph, [...visited]),
      relaxedEdge: null,
      shortestPath: [],
      description: `Navigating to "${currentLabel}" (distance: ${distances[current]}) — checking connected roads...`,
      pseudocodeLine: 3,
    });

    // If we reached the destination
    if (current === endId) {
      const path = reconstructPath(previous, startId, endId);
      steps.push({
        visited: [...visited],
        current,
        frontier: [],
        path,
        distances: { ...distances },
        previous: { ...previous },
        edges: getVisitedEdges(graph, [...visited]),
        relaxedEdge: null,
        shortestPath: path,
        description: `🎯 Destination "${endLabel}" reached! Shortest distance: ${distances[endId]}. Tracing optimal route...`,
        pseudocodeLine: 8,
      });
      return steps;
    }

    // Relax neighbors
    const neighbors = getNeighbors(graph, current);
    for (const { neighbor, weight } of neighbors) {
      if (visited.has(neighbor)) continue;

      const alt = distances[current] + weight;
      const neighborLabel = graph.nodes.find(n => n.id === neighbor)?.label || neighbor;

      steps.push({
        visited: [...visited],
        current,
        frontier: [...unvisited].filter(id => distances[id] < Infinity),
        path: [],
        distances: { ...distances },
        previous: { ...previous },
        edges: getVisitedEdges(graph, [...visited]),
        relaxedEdge: { from: current, to: neighbor },
        shortestPath: [],
        description: `Checking road to "${neighborLabel}": current best = ${distances[neighbor] === Infinity ? '∞' : distances[neighbor]}, via "${currentLabel}" = ${alt}`,
        pseudocodeLine: 5,
      });

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;

        steps.push({
          visited: [...visited],
          current,
          frontier: [...unvisited].filter(id => distances[id] < Infinity),
          path: [],
          distances: { ...distances },
          previous: { ...previous },
          edges: getVisitedEdges(graph, [...visited]),
          relaxedEdge: { from: current, to: neighbor },
          shortestPath: [],
          description: `✨ Shorter route found! Updated "${neighborLabel}" distance to ${alt} via "${currentLabel}"`,
          pseudocodeLine: 6,
        });
      }
    }
  }

  // If destination not reachable
  const path = endId && distances[endId] < Infinity
    ? reconstructPath(previous, startId, endId)
    : [...visited];

  steps.push({
    visited: [...visited],
    current: null,
    frontier: [],
    path,
    distances: { ...distances },
    previous: { ...previous },
    edges: getVisitedEdges(graph, [...visited]),
    relaxedEdge: null,
    shortestPath: path,
    description: distances[endId] < Infinity
      ? `Dijkstra complete! Shortest path distance: ${distances[endId]} ✅`
      : `Dijkstra complete. ${endId ? `No route to "${endLabel}" exists. ❌` : 'All shortest distances computed. ✅'}`,
    pseudocodeLine: 9,
  });

  return steps;
}

function getNeighbors(graph, nodeId) {
  const neighbors = [];
  for (const edge of graph.edges) {
    if (edge.from === nodeId) {
      neighbors.push({ neighbor: edge.to, weight: edge.weight });
    }
    if (edge.to === nodeId) {
      neighbors.push({ neighbor: edge.from, weight: edge.weight });
    }
  }
  return neighbors;
}

function getVisitedEdges(graph, visitedNodes) {
  return graph.edges.filter(
    (e) => visitedNodes.includes(e.from) && visitedNodes.includes(e.to)
  );
}

function reconstructPath(previous, startId, endId) {
  const path = [];
  let current = endId;
  while (current !== null) {
    path.unshift(current);
    if (current === startId) break;
    current = previous[current];
  }
  return path[0] === startId ? path : [];
}
