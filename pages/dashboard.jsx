// pages/dashboard.jsx

import React from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">Dashboard</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Bienvenido al dashboard.</p>
          </div>
          <div className="px-4 py-4 sm:px-6">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
