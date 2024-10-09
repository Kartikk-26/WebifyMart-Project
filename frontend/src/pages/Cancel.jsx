// Cancel.js
import React from 'react';

const Cancel = () => {
  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold">Payment Canceled</h1>
      <p className="mt-4">Your payment was not completed. You can try again.</p>
      <a href="/cart" className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded">
        Return to Cart
      </a>
    </div>
  );
};

export default Cancel;
