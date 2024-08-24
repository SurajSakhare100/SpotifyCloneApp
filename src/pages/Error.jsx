import React from 'react';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! The page you’re looking for doesn’t exist.</p>
      <a href="/" className="text-lg text-green-500 hover:underline">
        Return to Home
      </a>
    </div>
  );
};

export default Error;
