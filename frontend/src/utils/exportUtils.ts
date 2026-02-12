import Papa from 'papaparse';
import { type Issue } from '../types.ts';

export const exportToCSV = (issues: Issue[]) => {
  const csv = Papa.unparse(issues);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'issues.csv';
  link.click();
};

export const exportToJSON = (issues: Issue[]) => {
  const json = JSON.stringify(issues, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'issues.json';
  link.click();
};