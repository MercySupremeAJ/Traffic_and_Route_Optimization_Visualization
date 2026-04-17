/**
 * Bubble Sort — Traffic Prioritization
 * Vehicles (bars) bubble up by priority level.
 * Generates all comparison and swap steps for animation.
 */
export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  const sorted = new Set();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivot: null,
    range: null,
    description: 'Starting Bubble Sort — prioritizing traffic flow...',
    pseudocodeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        pivot: null,
        range: null,
        description: `Comparing traffic at positions ${j} and ${j + 1}: ${arr[j]} vs ${arr[j + 1]}`,
        pseudocodeLine: 3,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          pivot: null,
          range: null,
          description: `Swapping! Vehicle ${arr[j + 1]} yields to ${arr[j]} — higher priority moves forward.`,
          pseudocodeLine: 4,
        });
      }
    }
    sorted.add(n - 1 - i);
  }

  sorted.add(0);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    pivot: null,
    range: null,
    description: 'Bubble Sort complete — all traffic prioritized! ✅',
    pseudocodeLine: 7,
  });

  return steps;
}
