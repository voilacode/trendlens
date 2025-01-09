// frontend/src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to TrendLens</h1>
        <p className="text-lg mb-8">An AI-powered social media pulse analyzer</p>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
