/**
 * Merge Sort — Efficient Traffic Redistribution
 * Divides traffic into lanes, sorts each lane, and merges them efficiently.
 * Generates all steps for visualization.
 */
export function generateMergeSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const auxiliaryArray = [...arr];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivot: null,
    range: null,
    mergeRanges: null,
    description: 'Starting Merge Sort — dividing traffic into lanes...',
    pseudocodeLine: 0,
  });

  mergeSortHelper(auxiliaryArray, 0, arr.length - 1, arr, steps);

  steps.push({
    array: [...auxiliaryArray],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    pivot: null,
    range: null,
    mergeRanges: null,
    description: 'Merge Sort complete — all lanes merged efficiently! ✅',
    pseudocodeLine: 8,
  });

  return steps;
}

function mergeSortHelper(arr, left, right, originalArr, steps) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivot: null,
    range: [left, right],
    mergeRanges: { left: [left, mid], right: [mid + 1, right] },
    description: `Dividing lane [${left}..${right}] into [${left}..${mid}] and [${mid + 1}..${right}]`,
    pseudocodeLine: 2,
  });

  mergeSortHelper(arr, left, mid, originalArr, steps);
  mergeSortHelper(arr, mid + 1, right, originalArr, steps);
  merge(arr, left, mid, right, steps);
}

function merge(arr, left, mid, right, steps) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivot: null,
    range: [left, right],
    mergeRanges: { left: [left, mid], right: [mid + 1, right] },
    description: `Merging lanes [${left}..${mid}] and [${mid + 1}..${right}]`,
    pseudocodeLine: 5,
  });

  while (i < leftArr.length && j < rightArr.length) {
    steps.push({
      array: [...arr],
      comparing: [left + i, mid + 1 + j],
      swapping: [],
      sorted: [],
      pivot: null,
      range: [left, right],
      mergeRanges: null,
      description: `Comparing: ${leftArr[i]} vs ${rightArr[j]}`,
      pseudocodeLine: 6,
    });

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [k],
      sorted: [],
      pivot: null,
      range: [left, right],
      mergeRanges: null,
      description: `Placing ${arr[k]} at position ${k}`,
      pseudocodeLine: 6,
    });

    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [k],
      sorted: [],
      pivot: null,
      range: [left, right],
      mergeRanges: null,
      description: `Placing remaining ${arr[k]} at position ${k}`,
      pseudocodeLine: 7,
    });
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [k],
      sorted: [],
      pivot: null,
      range: [left, right],
      mergeRanges: null,
      description: `Placing remaining ${arr[k]} at position ${k}`,
      pseudocodeLine: 7,
    });
    j++;
    k++;
  }
}
