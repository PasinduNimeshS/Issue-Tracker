import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge.tsx';
import { type Issue } from '../types.ts';
import { FiEdit3, FiCheckCircle, FiXCircle, FiTrash2, FiRotateCcw } from 'react-icons/fi';

interface IssueDetailProps {
  issue: Issue;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
}

const IssueDetail: React.FC<IssueDetailProps> = ({ issue, onUpdateStatus, onDelete }) => {
  const navigate = useNavigate();

  const changeStatus = (newStatus: string) => {
    const needsConfirm = newStatus === 'Resolved' || newStatus === 'Closed';

    const message = needsConfirm
      ? `Mark issue as ${newStatus}?`
      : `Change status to ${newStatus}?`;

    if (needsConfirm && !window.confirm(message)) {
      return;
    }

    // For non-confirmation cases we still can ask (optional)
    if (!needsConfirm && !window.confirm(message)) {
      return;
    }

    onUpdateStatus(newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Delete issue permanently?')) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight line-clamp-2">
            {issue.title}
          </h2>
          <StatusBadge status={issue.status} size="lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {issue.description || <span className="text-gray-400 italic">No description provided.</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Severity</p>
            <p className="mt-1 text-lg font-semibold">{issue.severity}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Priority</p>
            <p className="mt-1 text-lg font-semibold">{issue.priority}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Created</p>
            <p className="mt-1 text-base font-medium">
              {new Date(issue.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Status change controls */}
      <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Status</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => changeStatus('Open')}
            disabled={issue.status === 'Open'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiRotateCcw className="h-4 w-4" />
            Reopen
          </button>

          <button
            onClick={() => changeStatus('In Progress')}
            disabled={issue.status === 'In Progress'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiRotateCcw className="h-4 w-4" />
            In Progress
          </button>

          <button
            onClick={() => changeStatus('Resolved')}
            disabled={issue.status === 'Resolved'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiCheckCircle className="h-4 w-4" />
            Resolve
          </button>

          <button
            onClick={() => changeStatus('Closed')}
            disabled={issue.status === 'Closed'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiXCircle className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>

      {/* Other actions */}
      <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3 justify-end">
        <button
          onClick={() => navigate(`/issues/${issue._id}/edit`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <FiEdit3 className="h-4 w-4" />
          Edit Issue
        </button>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <FiTrash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueDetail;