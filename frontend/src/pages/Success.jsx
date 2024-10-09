// Success.js
import React from 'react';

const Success = () => {
  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase. Your order is being processed.</p>
      <a href="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded">
        Go to Home
      </a>
    </div>
  );
};

export default Success;
