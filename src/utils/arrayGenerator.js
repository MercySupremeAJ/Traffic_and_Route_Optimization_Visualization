/**
 * Array Generator — Creates random or sorted arrays for algorithm visualization
 * Arrays represent "traffic volumes" at intersections.
 */

/**
 * Generate a random array of given size with values between min and max.
 * @param {number} size - Number of elements
 * @param {number} min - Minimum value (default 5)
 * @param {number} max - Maximum value (default 100)
 * @returns {number[]}
 */
export function generateRandomArray(size = 20, min = 5, max = 100) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generate a sorted array for binary search testing.
 * @param {number} size - Number of elements
 * @param {number} step - Step between values (randomized slightly)
 * @returns {number[]}
 */
export function generateSortedArray(size = 20) {
  const arr = [];
  let current = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < size; i++) {
    arr.push(current);
    current += Math.floor(Math.random() * 8) + 2;
  }
  return arr;
}

/**
 * Pick a random target from a sorted array (for binary search).
 * With a chance of picking a value not in the array.
 * @param {number[]} sortedArray
 * @returns {number}
 */
export function pickSearchTarget(sortedArray) {
  // 80% chance: pick existing value, 20% chance: pick missing value
  if (Math.random() < 0.8) {
    return sortedArray[Math.floor(Math.random() * sortedArray.length)];
  }
  // Pick a value between min and max not in array
  const min = sortedArray[0];
  const max = sortedArray[sortedArray.length - 1];
  let target;
  do {
    target = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (sortedArray.includes(target));
  return target;
}
