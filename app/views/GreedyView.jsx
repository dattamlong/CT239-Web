import { useState } from 'react';

// Hàm Greedy Job Assignment với độ trễ
function greedyJobAssignment(
  matrix,
  setCurrentStep,
  setAssignedJobs,
  setTotalCost,
  delay
) {
  const n = matrix.length;
  const assignedJobs = new Array(n).fill(-1);
  const assignedColumns = new Array(n).fill(false);
  let totalCost = 0;

  let worker = 0;

  function processWorker() {
    if (worker >= n) {
      setAssignedJobs(assignedJobs);
      setTotalCost(totalCost);
      return; // Nếu đã duyệt hết công nhân thì dừng
    }

    let minCost = Infinity;
    let minJob = -1;

    let job = 0;

    function processJob() {
      if (job >= n) {
        // Nếu đã duyệt hết các công việc
        // Gán công việc có chi phí thấp nhất
        assignedJobs[worker] = minJob;
        assignedColumns[minJob] = true;
        totalCost += matrix[worker][minJob]; // Cộng chi phí vào tổng

        setCurrentStep({
          worker,
          job: minJob,
          comparing: false,
          assigned: true,
        });

        worker++; // Chuyển sang công nhân tiếp theo
        setTimeout(processWorker, delay); // Đợi và xử lý công nhân tiếp theo
        return;
      }

      // Đánh dấu đang so sánh
      setCurrentStep({ worker, job, comparing: true });

      setTimeout(() => {
        // Kiểm tra nếu công việc chưa được gán và có chi phí thấp hơn
        if (!assignedColumns[job] && matrix[worker][job] < minCost) {
          minCost = matrix[worker][job];
          minJob = job;
        }

        job++; // Duyệt sang công việc tiếp theo
        processJob();
      }, delay);
    }

    processJob();
  }

  processWorker();
}

export const GreedyView = ({ costMatrix }) => {
  const [currentStep, setCurrentStep] = useState({ worker: -1, job: -1 });
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const delay = 300;

  const startAlgorithm = () => {
    // Reset state before starting the algorithm
    setCurrentStep({ worker: -1, job: -1 });
    setAssignedJobs(new Array(costMatrix.length).fill(-1));
    setTotalCost(0);

    greedyJobAssignment(
      costMatrix,
      setCurrentStep,
      setAssignedJobs,
      setTotalCost,
      delay
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="text-center">Thuật toán tham ăn</h2>
        <button className="btn btn-primary" onClick={startAlgorithm}>
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
                  <td
                    key={job}
                    className={
                      currentStep.worker === worker && currentStep.job === job
                        ? currentStep.comparing
                          ? 'table-warning' // Đang duyệt và so sánh (màu vàng)
                          : 'table-success' // Đã chọn công việc (màu xanh lá)
                        : assignedJobs[worker] === job
                          ? 'table-info' // Công việc đã được gán (màu xanh dương nhạt)
                          : ''
                    }
                  >
                    {cost}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-center">
        {currentStep.worker !== -1 && (
          <p>
            <strong>Worker {currentStep.worker + 1}</strong> đang kiểm tra Job{' '}
            <strong>{currentStep.job + 1}</strong>
          </p>
        )}
        {assignedJobs.length === costMatrix.length && (
          <>
            <h4 className="">Kết quả:</h4>
            <ul className="list-group">
              {assignedJobs.map((job, worker) => (
                <li key={worker} className="list-group-item">
                  Worker {worker + 1} được giao Job {job + 1}
                </li>
              ))}
            </ul>
            <h4 className="">Tổng chi phí: {totalCost}</h4>
          </>
        )}
      </div>
    </>
  );
};
