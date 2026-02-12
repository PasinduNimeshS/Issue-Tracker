import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIssues, setCurrentPage } from '../store/issueSlice.ts';

const useIssues = () => {
  const dispatch = useDispatch();
  const [search, setSearchState] = useState('');
  const [priority, setPriorityState] = useState('');
  const [status, setStatusState] = useState('');

  const setSearch = (value: string) => {
    setSearchState(value);
    dispatch(setCurrentPage(1));
  };

  const setPriority = (value: string) => {
    setPriorityState(value);
    dispatch(setCurrentPage(1));
  };

  const setStatus = (value: string) => {
    setStatusState(value);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return { search, setSearch, priority, setPriority, status, setStatus, handlePageChange };
};

export default useIssues;