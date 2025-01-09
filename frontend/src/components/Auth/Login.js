import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.email || !formData.password) {
      setAlert({ message: 'Both fields are required', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Success: Save user data and token
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);

      // Redirect to the appropriate page based on the role
      if (user.role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Server error';
      setAlert({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl mb-6">Login</h2>
      {alert.message && (
        <div className={`alert ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white p-2 mb-4 rounded`}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
