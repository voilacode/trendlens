import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import TrendForm from './components/TrendForm';
import UserManagement from './components/UserManagement';  // Import the UserManagement component
import EditUserForm from './components/EditUserForm';  // Import the EditUserForm component
import EditProfile from './components/EditProfile';
import TrendDisplay from './components/TrendDisplay';
// Authentication and Role Helpers
const isAuthenticated = () => !!localStorage.getItem('token'); // Check if user is logged in
const isAdmin = () => localStorage.getItem('role') === 'admin'; // Check for admin role

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Admin Route Wrapper
const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content p-4 bg-gray-100 min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-profile" element={<EditProfile/>} />


          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/post-analytics"
            element={
              <ProtectedRoute>
                <TrendForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sentiment-results"
            element={
              <ProtectedRoute>
                <TrendDisplay/>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="admin/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edituser/:id"
            element={
              <AdminRoute>
                <EditUserForm />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
