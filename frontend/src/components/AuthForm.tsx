import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">{buttonText}</button>
    </form>
  );
};

export default AuthForm;