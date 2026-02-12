import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side – Logo / Brand */}
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group transition-all"
          >
            {/* Modern icon badge */}
            <div className="bg-indigo-600 p-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04A12.027 12.027 0 012 12c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors duration-200">
              IssueTracker
            </span>
          </div>

          {/* Right side – Logout */}
          <div className="flex items-center">
            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;