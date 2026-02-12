import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks.ts';
import type { Issue } from '../types.ts';
import { useParams, useNavigate } from 'react-router-dom';
import IssueDetail from '../components/IssueDetail.tsx';
import { fetchIssueById, updateIssue, deleteIssue } from '../store/issueSlice.ts';
import { type RootState } from '../store/index';
import { toast } from 'react-toastify';

const IssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const issue = useSelector((state: RootState) => state.issues.currentIssue);

  useEffect(() => {
    if (id) dispatch(fetchIssueById(id));
  }, [dispatch, id]);

  const handleUpdateStatus = (status: string) => {
    if (id) {
      dispatch(updateIssue({ id, data: { status: status as Issue['status'] } }))
        .unwrap()
        .then(() => toast.success(`Issue marked as ${status}`));
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteIssue(id))
        .unwrap()
        .then(() => {
          toast.success('Issue deleted');
          navigate('/dashboard');
        })
        .catch(() => toast.error('Failed to delete'));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Details</h1>
      {issue ? <IssueDetail issue={issue} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} /> : <p>Loading...</p>}
    </div>
  );
};

export default IssueDetailPage;