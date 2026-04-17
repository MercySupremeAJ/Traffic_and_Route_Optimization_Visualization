/**
 * Binary Search — Target Location Search
 * Narrows down the search area in a sorted array to find a target.
 * Generates steps showing the elimination of search regions.
 */
export function generateBinarySearchSteps(sortedArray, target) {
  const arr = [...sortedArray];
  const steps = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    low: 0,
    high: arr.length - 1,
    mid: null,
    target,
    found: false,
    eliminated: [],
    description: `Starting Binary Search — searching for location ${target} in sorted routes...`,
    pseudocodeLine: 0,
  });

  let low = 0;
  let high = arr.length - 1;
  const eliminated = [];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid],
      swapping: [],
      sorted: [],
      low,
      high,
      mid,
      target,
      found: false,
      eliminated: [...eliminated],
      description: `Checking mid-point position ${mid}: value ${arr[mid]} vs target ${target}`,
      pseudocodeLine: 3,
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [mid],
        sorted: [mid],
        low,
        high,
        mid,
        target,
        found: true,
        eliminated: [...eliminated],
        description: `🎯 Target ${target} found at position ${mid}! Location reached!`,
        pseudocodeLine: 4,
      });
      return steps;
    } else if (arr[mid] < target) {
      // Eliminate left half
      for (let i = low; i <= mid; i++) eliminated.push(i);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        low: mid + 1,
        high,
        mid,
        target,
        found: false,
        eliminated: [...eliminated],
        description: `${arr[mid]} < ${target} — eliminating left zone. Searching right: [${mid + 1}..${high}]`,
        pseudocodeLine: 5,
      });
      low = mid + 1;
    } else {
      // Eliminate right half
      for (let i = mid; i <= high; i++) eliminated.push(i);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        low,
        high: mid - 1,
        mid,
        target,
        found: false,
        eliminated: [...eliminated],
        description: `${arr[mid]} > ${target} — eliminating right zone. Searching left: [${low}..${mid - 1}]`,
        pseudocodeLine: 6,
      });
      high = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    low,
    high,
    mid: null,
    target,
    found: false,
    eliminated: [...eliminated],
    description: `Target ${target} not found in the route system. ❌`,
    pseudocodeLine: 7,
  });

  return steps;
}
