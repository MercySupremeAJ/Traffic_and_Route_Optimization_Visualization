/**
 * Quick Sort — Fast Route Optimization
 * Pivot intersection sorts traffic left/right quickly.
 * Generates all partition and swap steps.
 */
export function generateQuickSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const sorted = new Set();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivot: null,
    range: null,
    description: 'Starting Quick Sort — optimizing routes at pivot intersections...',
    pseudocodeLine: 0,
  });

  quickSortHelper(arr, 0, arr.length - 1, steps, sorted);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    pivot: null,
    range: null,
    description: 'Quick Sort complete — all routes optimized! ✅',
    pseudocodeLine: 9,
  });

  return steps;
}

function quickSortHelper(arr, low, high, steps, sorted) {
  if (low >= high) {
    if (low === high) sorted.add(low);
    return;
  }

  const pivotIndex = partition(arr, low, high, steps, sorted);
  sorted.add(pivotIndex);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    pivot: pivotIndex,
    range: [low, high],
    description: `Pivot ${arr[pivotIndex]} placed at position ${pivotIndex} — this intersection is sorted!`,
    pseudocodeLine: 4,
  });

  quickSortHelper(arr, low, pivotIndex - 1, steps, sorted);
  quickSortHelper(arr, pivotIndex + 1, high, steps, sorted);
}

function partition(arr, low, high, steps, sorted) {
  const pivot = arr[high];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    pivot: high,
    range: [low, high],
    description: `Choosing pivot intersection: ${pivot} at position ${high}`,
    pseudocodeLine: 5,
  });

  let i = low - 1;

  for (let j = low; j < high; j++) {
    steps.push({
      array: [...arr],
      comparing: [j, high],
      swapping: [],
      sorted: [...sorted],
      pivot: high,
      range: [low, high],
      description: `Checking: is ${arr[j]} < pivot ${pivot}?`,
      pseudocodeLine: 6,
    });

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [i, j],
          sorted: [...sorted],
          pivot: high,
          range: [low, high],
          description: `Routing traffic: swapping ${arr[i]} and ${arr[j]} at positions ${i} and ${j}`,
          pseudocodeLine: 7,
        });
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  if (i + 1 !== high) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [...sorted],
      pivot: i + 1,
      range: [low, high],
      description: `Placing pivot ${pivot} at its correct position ${i + 1}`,
      pseudocodeLine: 8,
    });
  }

  return i + 1;
}
