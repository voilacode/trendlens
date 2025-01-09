// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">TrendLens</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-yellow-200">Home</Link>
          {!token ? (
            <>
              <Link to="/login" className="text-white hover:text-yellow-200">Login</Link>
              <Link to="/register" className="text-white hover:text-yellow-200">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white hover:text-yellow-200">Dashboard</Link>
              <Link to="/post-analytics" className="text-white hover:text-yellow-200">Post Analytics</Link>
              {role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-yellow-200">Admin Panel</Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white hover:text-yellow-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
