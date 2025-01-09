// frontend/src/components/Alert.js
import React from 'react';

const Alert = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = type === 'success' ? 'text-green-900' : 'text-red-900';

  return (
    <div className={`${bgColor} ${textColor} p-2 rounded-md my-4 max-w-md mx-auto`}>
      <p className="font-medium text-white text-sm">{message}</p>
    </div>
  );
};

export default Alert;
