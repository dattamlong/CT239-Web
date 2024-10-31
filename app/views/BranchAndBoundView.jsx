import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { findMinCost } from '../algorithm/branchAndBound.js';

export function BranchAndBoundView({ costMatrix }) {
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const finalResult = findMinCost(costMatrix);
    setResult(finalResult);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Thuật toán nhánh cận - Cây phân cấp</h2>
      <button className="btn btn-primary" onClick={handleCalculate}>
        Thực hiện
      </button>

      {result && (
        <div
          id="treeWrapper"
          style={{ width: '100%', height: '500px', marginTop: '20px' }}
        >
          <Tree
            data={result.tree}
            orientation="vertical"
            translate={{ x: 300, y: 50 }}
            // pathFunc="straight"
            separation={{ siblings: 2, nonSiblings: 2 }}
            zoomable={true}
            scaleExtent={{ min: 0.5, max: 2 }}
          />
        </div>
      )}
    </div>
  );
}
