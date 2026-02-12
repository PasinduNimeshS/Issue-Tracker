import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { type RootState } from '../store/index';
import { fetchIssues, deleteIssue, fetchIssueCounts } from '../store/issueSlice.ts';
import useIssues from '../hooks/useIssues.ts';
import IssueList from '../components/IssueList.tsx';
import SearchFilter from '../components/SearchFilter.tsx';
import ExportButton from '../components/ExportButton.tsx';
import { toast } from 'react-toastify';

const IssuesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { issues, counts, loading, totalPages, currentPage } = useSelector((state: RootState) => state.issues);
  const { search, priority, status, setSearch, setPriority, setStatus, handlePageChange } = useIssues();

  useEffect(() => {
    dispatch(fetchIssues({ search, priority, status, page: currentPage }));
    dispatch(fetchIssueCounts());
  }, [dispatch, search, priority, status, currentPage]);

  const handleDelete = (id: string) => {
    dispatch(deleteIssue(id))
      .unwrap()
      .then(() => toast.success('Issue deleted'))
      .catch(() => toast.error('Failed to delete'));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard - Issue Tracker</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
  {/* Open */}
  <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-red-700 uppercase tracking-wide">Open</p>
        <p className="text-3xl font-bold text-red-800 mt-1">
          {counts.find(c => c._id === 'Open')?.count || 0}
        </p>
      </div>
      <div className="text-red-500/80 text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>

  {/* In Progress */}
  <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-amber-700 uppercase tracking-wide">In Progress</p>
        <p className="text-3xl font-bold text-amber-800 mt-1">
          {counts.find(c => c._id === 'In Progress')?.count || 0}
        </p>
      </div>
      <div className="text-amber-500/80 text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </div>
  </div>

  {/* Resolved */}
  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Resolved</p>
        <p className="text-3xl font-bold text-emerald-800 mt-1">
          {counts.find(c => c._id === 'Resolved')?.count || 0}
        </p>
      </div>
      <div className="text-emerald-500/80 text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Closed */}
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Closed</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {counts.find(c => c._id === 'Closed')?.count || 0}
        </p>
      </div>
      <div className="text-gray-500/80 text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</div>
      <div className="flex justify-between mb-4">
        <button onClick={() => navigate('/issues/create')} className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Issue</button>
        <ExportButton issues={issues} />
      </div>
      <SearchFilter onSearch={(s, p, st) => { setSearch(s); setPriority(p); setStatus(st); }} />
      {loading ? <p>Loading...</p> : <IssueList issues={issues} onDelete={handleDelete} />}
      <div className="flex justify-center mt-4 space-x-4">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="bg-gray-300 px-4 py-2 rounded-md">Prev</button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="bg-gray-300 px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default IssuesPage;