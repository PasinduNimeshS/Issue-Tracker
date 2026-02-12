// src/components/IssueList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.tsx';
import { type Issue } from '../types.ts';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface IssueListProps {
  issues: Issue[];
  onDelete: (id: string) => void;
}

const IssueList: React.FC<IssueListProps> = ({ issues, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {issues.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg font-medium">No issues found</p>
          <p className="mt-2">Create a new issue to get started</p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {issues.map((issue) => (
              <tr
                key={issue._id}
                className="group transition-all duration-150 hover:bg-indigo-50/40 hover:shadow-sm"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <Link
                    to={`/issues/${issue._id}`}
                    className="text-indigo-700 font-medium hover:text-indigo-900 transition-colors"
                  >
                    {issue.title}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={issue.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`
                      inline-block px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        issue.priority === 'High'
                          ? 'bg-red-100 text-red-800'
                          : issue.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                      }
                    `}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/issues/${issue._id}/edit`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                      title="Edit issue"
                    >
                      <FiEdit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Link>

                    <button
                      onClick={() => onDelete(issue._id)}
                      className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
                      title="Delete issue"
                    >
                      <FiTrash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IssueList;