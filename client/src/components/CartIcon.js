"use client";

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

// No more Link import - this component will be used inside a Link

export default function CartIcon() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  return (
    <>
      {/* No Link wrapper - just the content */}
      <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
      <FaShoppingCart size={18} className="relative z-10 group-hover:text-white transition-colors duration-300" />
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">CART</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#ffdd00] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
          {cartCount}
        </span>
      )}
    </>
  );
}