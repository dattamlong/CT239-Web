function permute(arr) {
  if (arr.length === 0) return [[]];
  const result = [];
  arr.forEach((item, index) => {
    const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
    const perms = permute(remaining);
    perms.forEach((perm) => result.push([item, ...perm]));
  });
  return result;
}

function calculateCost(costMatrix, jobOrder) {
  let totalCost = 0;
  for (let worker = 0; worker < costMatrix.length; worker++) {
    const job = jobOrder[worker];
    totalCost += costMatrix[worker][job];
  }
  return totalCost;
}

export function jobAssignmentUsingPermutations(costMatrix) {
  const numJobs = costMatrix[0].length;
  const jobs = Array.from({ length: numJobs }, (_, i) => i);
  const allPermutations = permute(jobs);
  let minCost = Infinity;
  let bestAssignment = null;

  allPermutations.forEach((jobOrder) => {
    const currentCost = calculateCost(costMatrix, jobOrder);
    if (currentCost < minCost) {
      minCost = currentCost;
      bestAssignment = jobOrder;
    }
  });

  return { minCost, bestAssignment };
}

const costMatrix = [
  [9, 5, 0, 3, 6, 9, 3],
  [8, 5, 9, 9, 3, 5, 8],
  [4, 4, 9, 3, 0, 6, 1],
  [9, 9, 6, 1, 6, 1, 3],
  [0, 4, 3, 7, 3, 4, 4],
  [7, 9, 6, 4, 5, 9, 7],
  [7, 4, 7, 3, 7, 0, 0],
];

const result = jobAssignmentUsingPermutations(costMatrix);

console.log('Total Minimum Cost:', result.minCost);
console.log('Best Job Assignment (worker -> job):', result.bestAssignment);
