"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function CartNotification({ isVisible, onClose, productName }) {
  // Automatically hide the notification after some time
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 max-w-md w-full md:w-96 bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out">
      <div className="p-4 bg-off-white border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaShoppingCart className="text-green-500 mr-2" />
            <h3 className="font-medium text-zinc-900">Added to Cart</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-zinc-700 mb-4">
          <span className="font-medium">{productName || "Item"}</span> has been added to your cart.
        </p>
        
        <div className="flex space-x-3">
          <Link 
            href="/cart" 
            className="flex-1 bg-black text-white text-center py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            View Cart
          </Link>
          <button
            onClick={onClose}
            className="flex-1 border border-black text-zinc-900 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}