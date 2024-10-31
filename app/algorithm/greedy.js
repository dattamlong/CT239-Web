export function greedyJobAssignment(matrix) {
  const n = matrix.length;

  const assignedJobs = new Array(n).fill(-1);
  const assignedWorkers = new Array(n).fill(false);
  const assignedColumns = new Array(n).fill(false);

  for (let worker = 0; worker < n; worker++) {
    let minCost = Infinity;
    let minJob = -1;

    for (let job = 0; job < n; job++) {
      if (!assignedColumns[job] && matrix[worker][job] < minCost) {
        minCost = matrix[worker][job];
        minJob = job;
      }
    }

    assignedJobs[worker] = minJob;
    assignedColumns[minJob] = true;
    assignedWorkers[worker] = true;
  }

  const cost = assignedJobs.reduce(
    (sum, job, worker) => sum + matrix[worker][job],
    0
  );

  return { cost, assignedJobs };
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

export const assignments = greedyJobAssignment(costMatrix);

console.log('Jobs assigned to each worker: ', assignments);
