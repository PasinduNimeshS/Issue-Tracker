import React, { useState } from 'react';
import { type Issue } from '../types.ts';

interface IssueFormProps {
  initialData?: Partial<Issue>;
  onSubmit: (data: Partial<Issue>) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    severity: initialData.severity || 'Medium',
    priority: initialData.priority || 'Medium',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {initialData._id ? 'Edit Issue' : 'Create New Issue'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title */}
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 bg-white"
                placeholder=" "
              />
              <label
                htmlFor="title"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600"
              >
                Issue Title *
              </label>
            </div>

            {/* Description */}
            <div className="relative">
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 resize-y min-h-[120px] bg-white"
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600"
              >
                Description *
              </label>
            </div>

            {/* Severity & Priority – side by side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Severity */}
              <div className="relative">
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 bg-white appearance-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <label
                  htmlFor="severity"
                  className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none"
                >
                  Severity
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Priority */}
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 bg-white appearance-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <label
                  htmlFor="priority"
                  className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none"
                >
                  Priority
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {initialData._id ? 'Update Issue' : 'Create Issue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueForm;