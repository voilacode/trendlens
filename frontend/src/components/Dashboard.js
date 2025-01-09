// frontend/src/components/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <p className="text-lg mb-6">Welcome to your dashboard! Here you can manage your account.</p>

      {/* Link to edit profile */}
      <div className="mb-4">
      <Link
  to="/edit-profile"
  className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
>
  Edit Your Profile
</Link>

      </div>
      
      {/* Additional dashboard content can go here */}
    </div>
  );
};

export default Dashboard;
