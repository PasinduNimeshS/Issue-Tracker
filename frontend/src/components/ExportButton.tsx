import React from 'react';
import { exportToCSV, exportToJSON } from '../utils/exportUtils.ts';
import { type Issue } from '../types.ts';

interface ExportButtonProps {
  issues: Issue[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ issues }) => {
  return (
    <div className="space-x-4">
      <button onClick={() => exportToCSV(issues)} className="bg-green-500 text-white px-4 py-2 rounded-md">Export CSV</button>
      <button onClick={() => exportToJSON(issues)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Export JSON</button>
    </div>
  );
};

export default ExportButton;