"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FaCheckCircle, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

export default function ThankYouPage() {
  const { clearCart } = useCart();
  const [hasCleared, setHasCleared] = useState(false);
  
  // Clear the cart only once when component mounts
  useEffect(() => {
    if (!hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [hasCleared, clearCart]); // Include clearCart dependency

  return (
    <div className="min-h-screen bg-off-white py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaCheckCircle className="text-green-500" size={60} />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            
            <p className="text-lg text-gray-700 mb-6">
              Your order has been successfully placed. A confirmation email will be sent shortly.
            </p>
          </div>
          
          <div className="my-8 border-t border-b border-gray-200 py-6">
            <div className="flex justify-center">
              <Image
                src="/images/saltfields_logo.webp"
                alt="Saltfields Brewing Logo"
                width={180}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/shop" 
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <FaShoppingBag size={14} />
                <span>Continue Shopping</span>
              </Link>
              
              <Link 
                href="/" 
                className="flex-1 flex items-center justify-center gap-2 border border-black text-black py-3 px-6 rounded-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <FaArrowLeft size={14} />
                <span>Return to Homepage</span>
              </Link>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-6">
              <p>
                If you have any questions about your order, please contact us at{' '}
                <a href="mailto:yumi@saltfields.com" className="text-amber-500 hover:underline">
                  yumi@saltfields.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}