// src/components/CheckoutButton.js
"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaSpinner, FaLock } from 'react-icons/fa';

export default function CheckoutButton({ className = "", buttonText = "Proceed to Checkout" }) {
  const { checkout, isLoading, error } = useCart();

  return (
    <div className="w-full">
      <button
        onClick={checkout}
        disabled={isLoading}
        className={`w-full flex items-center justify-center space-x-2 bg-black text-white py-3 px-6 rounded font-medium transition-colors ${isLoading ? 'opacity-70' : 'hover:bg-zinc-800'} ${className}`}
        aria-label="Proceed to checkout"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            <span>Preparing Checkout...</span>
          </>
        ) : (
          <>
            <FaLock className="text-sm mr-2" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
      
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
      
      <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
        <FaLock className="mr-1" size={10} />
        <span>Secure checkout powered by Shopify</span>
      </div>
    </div>
  );
}