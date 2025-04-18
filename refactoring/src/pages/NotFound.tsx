
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
      <p className="mb-8 text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
