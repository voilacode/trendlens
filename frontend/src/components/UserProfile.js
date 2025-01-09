import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Fetch user profile when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      setAlert({ message: 'Error fetching user profile', type: 'error' });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const { username, email } = user;

    try {
      const response = await axios.put('/api/users/profile', { username, email }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAlert({ message: 'Profile updated successfully', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Error updating profile', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">User Profile</h2>

      {/* Show alert message */}
      {alert.message && (
        <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 mb-6`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleProfileUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
