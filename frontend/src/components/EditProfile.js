import React, { useEffect, useState } from 'react';
import API from '../api/api'; // Assuming your API utility is in this file

const EditProfile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Fetch current user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get('/users/profile'); // Assuming the endpoint is '/users/profile'
        setUser(response.data);
      } catch (error) {
        setAlert({ message: 'Error fetching user profile', type: 'error' });
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.put('/users/profile', user); // Assuming PUT request for profile update
      setAlert({ message: response.data.message, type: 'success' });
    } catch (error) {
      setAlert({ message: 'Error updating profile', type: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Edit Profile</h2>
      {alert.message && (
        <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-3 mb-6`}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
