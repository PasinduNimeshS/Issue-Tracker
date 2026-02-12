import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.ts';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col">
      {/* Background Pattern - Increased bubble size and spacing */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_2px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation - Simplified Header */}
        <nav className="max-w-7xl mx-auto px-6 w-full py-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-300">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">IssueTracker</span>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-900 text-white px-7 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 text-sm sm:text-base"
              >
                Go to Dashboard
              </button>
            ) : (
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 text-sm sm:text-base"
              >
                Get Started
              </Link>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto py-12 sm:py-20">
          <div className="space-y-8 sm:space-y-10">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">v1 Now Live</span>
            </div>
            
            <h1 className="text-4xl sm:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Manage issues <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                without the noise.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
              IssueTracker is the intuitive workspace where teams track, prioritize, and resolve software bugs faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1 active:translate-y-0"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full sm:w-auto px-10 py-5 bg-white text-red-600 border-2 border-red-50 rounded-2xl font-black text-lg hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1 active:translate-y-0"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/login" 
                    className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-black text-lg hover:border-indigo-100 hover:bg-gray-50 transition-all shadow-sm"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Social Proof / Stats */}
            <div className="pt-12 sm:pt-20 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-60">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">10k+</span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tighter">Active Users</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">99.9%</span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tighter">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">24/7</span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-tighter">Support</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - Simplified */}
        <footer className="py-12 px-6 w-full max-w-7xl mx-auto border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 grayscale opacity-50">
            <div className="bg-gray-900 p-1.5 rounded-lg">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">IssueTracker</span>
          </div>
          <p className="text-sm font-medium text-gray-400">
            &copy; {new Date().getFullYear()} IssueTracker
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;