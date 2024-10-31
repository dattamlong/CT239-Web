import React, { useState } from 'react';

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

export const BruteForceView = ({ costMatrix }) => {
  const [viewMore, setViewMore] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
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

    setResult({ minCost, bestAssignment, allPermutations });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="text-center">Thuật toán vét cạn</h2>
        <button className="btn btn-primary" onClick={handleCalculate}>
          Thực hiện
        </button>
      </div>
      {costMatrix.length > 0 && costMatrix[0].length > 0 && (
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th></th>
              {costMatrix[0].map((_, job) => (
                <th key={job}>Công việc {job + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costMatrix.map((row, worker) => (
              <tr key={worker}>
                <th>Nhân viên {worker + 1}</th>
                {row.map((cost, job) => (
                  <td key={job}>{cost}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {result && (
        <>
          <h2>Hoán vị</h2>

          <table className="table table-bordered text-center mb-3">
            <thead>
              <tr>
                <th></th>
                {result.bestAssignment.map((_, index) => (
                  <th key={index}>Phần tử {index + 1}</th>
                ))}
              </tr>
            </thead>
            {result.allPermutations
              .slice(0, viewMore ? result.allPermutations.length : 30)
              .map((perm, idx) => (
                <tr key={idx}>
                  <th>Hoán vị {idx + 1}</th>
                  {perm.map((job, jobIdx) => (
                    <td key={jobIdx}>{job}</td>
                  ))}
                </tr>
              ))}
          </table>
          <div className="">
            {result.allPermutations.length > 30 && (
              <button
                className="btn btn-secondary"
                onClick={() => setViewMore((prev) => !prev)}
              >
                {viewMore ? 'Thu gọn' : 'Xem thêm'}
              </button>
            )}
          </div>
          <h2>Best Assignment</h2>
          <p>
            Best Job Assignment (worker & job):{' '}
            {result.bestAssignment.map((job, idx) => (
              <span key={idx}>
                Worker {idx + 1} & Job {job + 1}{' '}
              </span>
            ))}
          </p>
          <p>Total Minimum Cost: {result.minCost}</p>
        </>
      )}
    </div>
  );
};
