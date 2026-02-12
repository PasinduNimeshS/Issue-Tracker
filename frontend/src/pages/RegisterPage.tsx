import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks.ts';
import AuthForm from '../components/AuthForm.tsx';
import { register } from '../store/authSlice.ts';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    dispatch(register({ email, password }))
      .unwrap()
      .then(() => {
        toast.success('Registered successfully! Welcome to the Issue Tracker.');
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Registration failed. Email may already be in use.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          {/* Icon / Logo circle */}
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <AuthForm onSubmit={handleSubmit} buttonText="Create Account" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;