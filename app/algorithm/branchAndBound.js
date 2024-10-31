function calculateCost(costMatrix, x, y, assigned) {
  const N = costMatrix.length;
  let cost = 0;
  let available = Array(N).fill(true);

  for (let i = x + 1; i < N; i++) {
    let min = Number.MAX_SAFE_INTEGER,
      minIndex = -1;

    for (let j = 0; j < N; j++) {
      if (!assigned[j] && available[j] && costMatrix[i][j] < min) {
        minIndex = j;
        min = costMatrix[i][j];
      }
    }

    cost += min;
    available[minIndex] = false;
  }

  return cost;
}

function buildTreeData(node) {
  if (!node) return null;

  const treeNode = {
    name:
      node.workerID === -1
        ? 'Start'
        : `Worker ${node.workerID + 1} -> Job ${node.jobID + 1}`,
    attributes: {
      pathCost: node.pathCost,
      totalCost: node.cost,
    },
    children: node.children.map(buildTreeData),
  };

  return treeNode;
}

export function findMinCost(costMatrix) {
  const N = costMatrix.length;
  let pq = [];
  let assigned = Array(N).fill(false);
  let root = {
    parent: null,
    workerID: -1,
    pathCost: 0,
    cost: 0,
    assigned: assigned,
    jobID: -1,
    children: [],
  };

  pq.push(root);

  let treeRoot = root;

  while (pq.length > 0) {
    let min = pq.shift();
    let i = min.workerID + 1;

    if (i === N) {
      return { cost: min.cost, tree: buildTreeData(treeRoot) };
    }

    for (let j = 0; j < N; j++) {
      if (!min.assigned[j]) {
        let child = {
          parent: min,
          workerID: i,
          jobID: j,
          pathCost: min.pathCost + costMatrix[i][j],
          assigned: [...min.assigned],
          children: [],
        };

        child.assigned[j] = true;
        child.cost =
          child.pathCost + calculateCost(costMatrix, i, j, child.assigned); // Tính tổng chi phí

        min.children.push(child);

        pq.push(child);
      }
    }

    pq.sort((a, b) => a.cost - b.cost);
  }

  return null;
}

const costMatrix = [
  [1, 2, 8],
  [3, 5, 4],
  [6, 4, 7],
];

console.log('results', findMinCost(costMatrix));
