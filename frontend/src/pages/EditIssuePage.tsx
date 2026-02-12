import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/hooks.ts';
import { useParams, useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm.tsx';
import { fetchIssueById, updateIssue } from '../store/issueSlice.ts';
import { type RootState } from '../store/index';
import { toast } from 'react-toastify';

const EditIssuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const issue = useSelector((state: RootState) => state.issues.currentIssue);

  useEffect(() => {
    if (id) dispatch(fetchIssueById(id));
  }, [dispatch, id]);

  const handleSubmit = (data: any) => {
    if (id) {
      dispatch(updateIssue({ id, data }))
        .unwrap()
        .then(() => {
          toast.success('Issue updated');
          navigate('/dashboard');
        })
        .catch(() => toast.error('Failed to update'));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Issue</h1>
      {issue ? <IssueForm initialData={issue} onSubmit={handleSubmit} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditIssuePage;