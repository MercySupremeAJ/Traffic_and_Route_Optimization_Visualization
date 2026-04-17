/**
 * Graph Generator — Creates city-like graph data
 * Nodes represent intersections, edges represent roads with traffic weights.
 */

const INTERSECTION_NAMES = [
  'Central Station', 'Market Square', 'Tech Park', 'City Hall',
  'Harbor Bridge', 'University', 'Airport', 'Stadium',
  'Hospital', 'Mall', 'Library', 'Park Lane',
  'Train Depot', 'Bus Terminal', 'Fire Station', 'Police HQ',
  'Museum', 'Theater', 'Waterfront', 'Industrial Zone',
];

/**
 * Generate a random connected city graph.
 * @param {number} nodeCount - Number of intersections (6-18)
 * @returns {{ nodes: Array, edges: Array }}
 */
export function generateCityGraph(nodeCount = 12) {
  const count = Math.max(6, Math.min(18, nodeCount));
  const nodes = [];
  const edges = [];

  // Position nodes in a grid-like layout with some randomness
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const spacingX = 700 / (cols + 1);
  const spacingY = 450 / (rows + 1);

  const shuffledNames = [...INTERSECTION_NAMES]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    nodes.push({
      id: `n${i}`,
      label: shuffledNames[i],
      x: spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.4,
      y: spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.4,
    });
  }

  // Create edges: ensure connectivity with a spanning tree, then add extra roads
  const connected = new Set([0]);
  const unconnected = new Set(Array.from({ length: count }, (_, i) => i).filter(i => i !== 0));

  // Step 1: Spanning tree (ensures all nodes are connected)
  while (unconnected.size > 0) {
    const from = randomFromSet(connected);
    const to = randomFromSet(unconnected);
    unconnected.delete(to);
    connected.add(to);
    edges.push({
      from: `n${from}`,
      to: `n${to}`,
      weight: Math.floor(Math.random() * 9) + 1, // traffic level 1-9
    });
  }

  // Step 2: Add extra edges for a more realistic road network
  const extraEdges = Math.floor(count * 0.8);
  const edgeSet = new Set(edges.map(e => edgeKey(e.from, e.to)));

  for (let i = 0; i < extraEdges; i++) {
    const from = Math.floor(Math.random() * count);
    const to = Math.floor(Math.random() * count);
    if (from === to) continue;

    const key = edgeKey(`n${from}`, `n${to}`);
    if (edgeSet.has(key)) continue;

    // Prefer connecting nearby nodes
    const dist = Math.abs(from - to);
    if (dist > cols + 1 && Math.random() > 0.3) continue;

    edgeSet.add(key);
    edges.push({
      from: `n${from}`,
      to: `n${to}`,
      weight: Math.floor(Math.random() * 9) + 1,
    });
  }

  return { nodes, edges };
}

/**
 * Get a random element from a Set
 */
function randomFromSet(set) {
  const arr = Array.from(set);
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Create a unique key for an undirected edge
 */
function edgeKey(from, to) {
  return [from, to].sort().join('-');
}

/**
 * Get the default start and end nodes for pathfinding.
 * @param {{ nodes: Array }} graph
 * @returns {{ startId: string, endId: string }}
 */
export function getDefaultEndpoints(graph) {
  if (graph.nodes.length < 2) {
    return { startId: graph.nodes[0]?.id, endId: graph.nodes[0]?.id };
  }
  return {
    startId: graph.nodes[0].id,
    endId: graph.nodes[graph.nodes.length - 1].id,
  };
}
