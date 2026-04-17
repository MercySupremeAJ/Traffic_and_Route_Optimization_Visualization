/**
 * Algorithm Metadata — Complexity, Pseudocode & Descriptions
 * Central registry for all algorithm information.
 */

export const ALGORITHM_CATEGORIES = {
  SORTING: 'sorting',
  SEARCHING: 'searching',
  GRAPH: 'graph',
};

export const VIEW_MODES = {
  BAR: 'bar',
  GRAPH: 'graph',
};

export const ALGORITHMS = {
  bubbleSort: {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    category: ALGORITHM_CATEGORIES.SORTING,
    defaultView: VIEW_MODES.BAR,
    trafficMetaphor: 'Traffic Prioritization',
    icon: '🫧',
    description:
      'Vehicles (data elements) repeatedly compared with neighbors. Higher priority vehicles "bubble" forward through the traffic. Simple but slow — like stop-and-go traffic with constant lane changes.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    pseudocode: {
      english: [
        'Start from the beginning of the traffic queue',
        'Compare each pair of adjacent vehicles',
        'If they are in wrong order, swap them',
        '  Swap the two vehicles',
        'Repeat until no more swaps needed',
        'The last vehicle is now in its correct position',
        'Reduce the unsorted region by one',
        'All vehicles are properly ordered ✅',
      ],
      javascript: [
        'function bubbleSort(arr) {',
        '  for (let i = 0; i < arr.length - 1; i++) {',
        '    for (let j = 0; j < arr.length - i - 1; j++) {',
        '      if (arr[j] > arr[j + 1]) {',
        '        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]; // swap',
        '      }',
        '    }',
        '  }',
        '}',
      ],
      python: [
        'def bubble_sort(arr):',
        '    for i in range(len(arr) - 1):',
        '        for j in range(len(arr) - i - 1):',
        '            if arr[j] > arr[j + 1]:',
        '                arr[j], arr[j+1] = arr[j+1], arr[j]  # swap',
        '',
        '',
        '    return arr',
      ],
    },
  },

  mergeSort: {
    id: 'mergeSort',
    name: 'Merge Sort',
    category: ALGORITHM_CATEGORIES.SORTING,
    defaultView: VIEW_MODES.BAR,
    trafficMetaphor: 'Traffic Redistribution',
    icon: '🔀',
    description:
      'Traffic is divided into smaller lanes, each sorted independently, then merged back together. Like a highway interchange where merging lanes are pre-sorted for efficient flow.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    pseudocode: {
      english: [
        'If the traffic lane has one or zero vehicles, it\'s sorted',
        'Split the traffic lane into two halves',
        '  Left half and right half',
        'Recursively sort the left half',
        'Recursively sort the right half',
        'Merge the two sorted halves together',
        '  Compare front vehicles from each lane',
        '  Place the smaller vehicle first',
        'All lanes merged into sorted traffic ✅',
      ],
      javascript: [
        'function mergeSort(arr) {',
        '  if (arr.length <= 1) return arr;',
        '  const mid = Math.floor(arr.length / 2);',
        '  const left = mergeSort(arr.slice(0, mid));',
        '  const right = mergeSort(arr.slice(mid));',
        '  return merge(left, right);',
        '}',
        '// Merge two sorted halves',
        'function merge(left, right) { ... }',
      ],
      python: [
        'def merge_sort(arr):',
        '    if len(arr) <= 1: return arr',
        '    mid = len(arr) // 2',
        '    left = merge_sort(arr[:mid])',
        '    right = merge_sort(arr[mid:])',
        '    return merge(left, right)',
        '',
        '# Merge two sorted halves',
        'def merge(left, right): ...',
      ],
    },
  },

  quickSort: {
    id: 'quickSort',
    name: 'Quick Sort',
    category: ALGORITHM_CATEGORIES.SORTING,
    defaultView: VIEW_MODES.BAR,
    trafficMetaphor: 'Route Optimization',
    icon: '⚡',
    description:
      'A pivot intersection is chosen. All lighter traffic goes left, heavier goes right. The pivot is now perfectly placed. Recursively optimize each side — like roundabouts directing traffic flow.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    pseudocode: {
      english: [
        'Choose a pivot intersection (last element)',
        'Partition traffic around the pivot',
        'All vehicles smaller than pivot go left',
        'All vehicles larger than pivot go right',
        'Pivot is now in its correct position',
        'Choose pivot for the sub-section',
        'Compare each vehicle with the pivot',
        '  Swap if needed to maintain partition',
        '  Place pivot in its final position',
        'All routes fully optimized ✅',
      ],
      javascript: [
        'function quickSort(arr, low, high) {',
        '  if (low < high) {',
        '    const pivot = partition(arr, low, high);',
        '    quickSort(arr, low, pivot - 1);',
        '    quickSort(arr, pivot + 1, high);',
        '  }',
        '}',
        'function partition(arr, low, high) {',
        '  const pivot = arr[high]; ...',
        '}',
      ],
      python: [
        'def quick_sort(arr, low, high):',
        '    if low < high:',
        '        pivot = partition(arr, low, high)',
        '        quick_sort(arr, low, pivot - 1)',
        '        quick_sort(arr, pivot + 1, high)',
        '',
        'def partition(arr, low, high):',
        '    pivot = arr[high]',
        '    ...',
      ],
    },
  },

  binarySearch: {
    id: 'binarySearch',
    name: 'Binary Search',
    category: ALGORITHM_CATEGORIES.SEARCHING,
    defaultView: VIEW_MODES.BAR,
    trafficMetaphor: 'Location Search',
    icon: '🔍',
    description:
      'Like using GPS to find a location on a sorted highway — check the middle, eliminate half the search area, repeat. Extremely efficient for pre-sorted route data.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    stable: true,
    pseudocode: {
      english: [
        'Set search boundaries: start to end of sorted route',
        'While there are positions to search:',
        '  Find the middle position',
        '  Check if the target is at the middle',
        '  If found: target location reached! 🎯',
        '  If target > middle: search right half',
        '  If target < middle: search left half',
        'Target not found in the route system ❌',
      ],
      javascript: [
        'function binarySearch(arr, target) {',
        '  let low = 0, high = arr.length - 1;',
        '  while (low <= high) {',
        '    const mid = Math.floor((low + high) / 2);',
        '    if (arr[mid] === target) return mid;',
        '    else if (arr[mid] < target) low = mid + 1;',
        '    else high = mid - 1;',
        '  }',
        '  return -1; // not found',
        '}',
      ],
      python: [
        'def binary_search(arr, target):',
        '    low, high = 0, len(arr) - 1',
        '    while low <= high:',
        '        mid = (low + high) // 2',
        '        if arr[mid] == target: return mid',
        '        elif arr[mid] < target: low = mid + 1',
        '        else: high = mid - 1',
        '    return -1  # not found',
      ],
    },
  },

  bfs: {
    id: 'bfs',
    name: 'BFS',
    category: ALGORITHM_CATEGORIES.GRAPH,
    defaultView: VIEW_MODES.GRAPH,
    trafficMetaphor: 'Road Traversal (Layer-by-Layer)',
    icon: '🌊',
    description:
      'Exploring the city like ripples in water — visit all nearby intersections first before going further. Guarantees the shortest path in unweighted road networks.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    stable: true,
    pseudocode: {
      english: [
        'Start at the source intersection',
        'Add it to the exploration queue',
        'While there are intersections in the queue:',
        '  Visit the front intersection',
        '  For each connected road:',
        '    If the destination hasn\'t been visited:',
        '      Add it to the queue',
        'All reachable intersections explored ✅',
      ],
      javascript: [
        'function bfs(graph, start) {',
        '  const queue = [start];',
        '  const visited = new Set([start]);',
        '  while (queue.length > 0) {',
        '    const node = queue.shift();',
        '    for (const neighbor of graph[node]) {',
        '      if (!visited.has(neighbor)) {',
        '        visited.add(neighbor);',
        '        queue.push(neighbor);',
        '      }',
        '    }',
        '  }',
        '}',
      ],
      python: [
        'def bfs(graph, start):',
        '    queue = deque([start])',
        '    visited = {start}',
        '    while queue:',
        '        node = queue.popleft()',
        '        for neighbor in graph[node]:',
        '            if neighbor not in visited:',
        '                visited.add(neighbor)',
        '                queue.append(neighbor)',
      ],
    },
  },

  dfs: {
    id: 'dfs',
    name: 'DFS',
    category: ALGORITHM_CATEGORIES.GRAPH,
    defaultView: VIEW_MODES.GRAPH,
    trafficMetaphor: 'Road Traversal (Deep Exploration)',
    icon: '🏊',
    description:
      'Exploring the city by going as deep as possible down one road before backtracking. Like a delivery driver who finishes one route completely before starting another.',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    stable: true,
    pseudocode: {
      english: [
        'Start at the source intersection',
        'Push it onto the exploration stack',
        'While there are intersections in the stack:',
        '  Visit the top intersection',
        '  For each connected road:',
        '    If destination hasn\'t been visited:',
        '      Push it onto the stack',
        'All reachable intersections explored ✅',
      ],
      javascript: [
        'function dfs(graph, start) {',
        '  const stack = [start];',
        '  const visited = new Set();',
        '  while (stack.length > 0) {',
        '    const node = stack.pop();',
        '    if (!visited.has(node)) {',
        '      visited.add(node);',
        '      for (const neighbor of graph[node]) {',
        '        if (!visited.has(neighbor))',
        '          stack.push(neighbor);',
        '      }',
        '    }',
        '  }',
        '}',
      ],
      python: [
        'def dfs(graph, start):',
        '    stack = [start]',
        '    visited = set()',
        '    while stack:',
        '        node = stack.pop()',
        '        if node not in visited:',
        '            visited.add(node)',
        '            for neighbor in graph[node]:',
        '                if neighbor not in visited:',
        '                    stack.append(neighbor)',
      ],
    },
  },

  dijkstra: {
    id: 'dijkstra',
    name: 'Dijkstra',
    category: ALGORITHM_CATEGORIES.GRAPH,
    defaultView: VIEW_MODES.GRAPH,
    trafficMetaphor: 'Shortest Path Navigation',
    icon: '🧭',
    description:
      'The GPS of algorithms — finds the absolute shortest route through the city considering traffic conditions (edge weights). Always picks the next closest intersection.',
    timeComplexity: { best: 'O(V²)', average: 'O(V²)', worst: 'O(V²)' },
    spaceComplexity: 'O(V)',
    stable: true,
    pseudocode: {
      english: [
        'Set all distances to infinity, except start = 0',
        'While there are unvisited intersections:',
        '  Pick the unvisited intersection with smallest distance',
        '  Mark it as visited',
        '  For each neighbor via connected roads:',
        '    Calculate distance through current intersection',
        '    If shorter than known distance, update it',
        '    Record the route for path reconstruction',
        'Destination reached — trace back the shortest path 🎯',
        'All shortest paths computed ✅',
      ],
      javascript: [
        'function dijkstra(graph, start, end) {',
        '  const dist = {}, prev = {};',
        '  // Init all distances to Infinity',
        '  for (const v of graph.nodes) dist[v] = Infinity;',
        '  dist[start] = 0;',
        '  while (unvisited.size > 0) {',
        '    const u = getMinDist(unvisited, dist);',
        '    for (const [v, w] of neighbors(u)) {',
        '      if (dist[u] + w < dist[v]) {',
        '        dist[v] = dist[u] + w; prev[v] = u;',
        '      }',
        '    }',
        '  }',
        '}',
      ],
      python: [
        'def dijkstra(graph, start, end):',
        '    dist = {v: float("inf") for v in graph}',
        '    dist[start] = 0',
        '    prev = {}',
        '    unvisited = set(graph.nodes)',
        '    while unvisited:',
        '        u = min(unvisited, key=lambda v: dist[v])',
        '        for v, w in neighbors(u):',
        '            if dist[u] + w < dist[v]:',
        '                dist[v] = dist[u] + w',
        '                prev[v] = u',
      ],
    },
  },
};

/** Get algorithm list grouped by category */
export function getAlgorithmsByCategory() {
  const groups = {};
  for (const algo of Object.values(ALGORITHMS)) {
    if (!groups[algo.category]) {
      groups[algo.category] = [];
    }
    groups[algo.category].push(algo);
  }
  return groups;
}

/** Get a single algorithm by its id */
export function getAlgorithm(id) {
  return ALGORITHMS[id] || null;
}
