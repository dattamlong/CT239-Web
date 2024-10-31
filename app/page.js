"use client"
import { useState } from 'react';
import { greedyJobAssignment } from './algorithm/greedy.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BruteForceView } from "@/app/views/BruteForceView";
import { BranchAndBoundView } from "@/app/views/BranchAndBoundView";
import { GreedyView } from "@/app/views/GreedyView";

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState();
  const [activeTab, setActiveTab] = useState('greedy');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const generateRandomInput = () => {
    const size = Math.floor(Math.random() * 7) + 1;
    let randomMatrix = '';

    for (let i = 0; i < size; i++) {
      const row = Array.from({ length: size }, () => Math.floor(Math.random() * 7) + 1).join(',');
      randomMatrix += row + '\n';
    }

    setInput(randomMatrix.trim());
  };

  const parsedArray = input
    ? input.split('\n').map((row) => row.split(',').map(Number))
    : [[]];

  return (
    <div className="container d-flex flex-column gap-2">
      <h1 className="text-center">Phân công công việc</h1>
      <textarea
        className="form-control"
        rows={10}
        cols={30}
        placeholder="Enter rows, separated by commas (e.g., 1,2,3)"
        value={input}
        onChange={handleInputChange}
      />
      <div className="row gap-2">
        <button
          className={`col btn ${activeTab === 'greedy' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('greedy')}
        >
          Thuật toán tham ăn
        </button>
        <button
          className={`col btn ${activeTab === 'bruteForce' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('bruteForce')}
        >
          Thuật toán vét cạn
        </button>

        <button
          className={`col btn ${activeTab === 'branchAndBound' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('branchAndBound')}
        >
          Thuật toán nhánh cận
        </button>
        <button
          className={`col btn ${activeTab === 'statistics' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('statistics')}
        >
          Thống kê
        </button>
        <button
          className="col btn btn-secondary"
          onClick={generateRandomInput}
        >
          Tạo giá trị ngẫu nhiên
        </button>
      </div>

      {activeTab === 'greedy' && <GreedyView costMatrix={parsedArray} />}
      {activeTab === 'bruteForce' && (
        <BruteForceView costMatrix={parsedArray} />
      )}
      {activeTab === 'branchAndBound' && (
        <BranchAndBoundView costMatrix={parsedArray} />
      )}
    </div>
  );
}
