import React from 'react';
import { useAppDispatch } from '../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm.tsx';
import { createIssue } from '../store/issueSlice.ts';
import { toast } from 'react-toastify';

const CreateIssuePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    dispatch(createIssue(data))
      .unwrap()
      .then(() => {
        toast.success('Issue created');
        navigate('/dashboard');
      })
      .catch(() => toast.error('Failed to create'));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>
      <IssueForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateIssuePage;