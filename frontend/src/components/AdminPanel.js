// frontend/src/components/AdminPanel.js
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }

    const userRole = JSON.parse(atob(token.split('.')[1])).role; // Decode JWT payload
    if (userRole !== 'admin') {
      // Redirect non-admin users to a 403 page or dashboard
      navigate('/403'); // Alternatively: navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold">Admin Panel</h2>

      {/* Button to navigate to User Management */}
      <div className="mt-6">
        <Link to="/admin/users">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
            Manage Users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
