import React, { useState, type ChangeEvent, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface SearchFilterProps {
  onSearch: (search: string, priority: string, status: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  const debouncedSearch = useMemo(() => debounce((s: string, p: string, st: string) => {
    onSearch(s, p, st);
  }, 300), [onSearch]);

  useEffect(() => () => { debouncedSearch.cancel(); }, [debouncedSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearch(v);
    debouncedSearch(v, priority, status);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setPriority(newPriority);
    onSearch(search, newPriority, status);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onSearch(search, priority, newStatus);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md p-2 flex-1"
      />
      <select value={priority} onChange={handlePriorityChange} className="border border-gray-300 rounded-md p-2">
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select value={status} onChange={handleStatusChange} className="border border-gray-300 rounded-md p-2">
        <option value="">All Statuses</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>
    </div>
  );
};

export default SearchFilter;