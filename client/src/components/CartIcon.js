"use client";

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

// No more Link import - this component will be used inside a Link

export default function CartIcon() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  return (
    <div className="relative flex items-center">
      <FaShoppingCart size={18} className="text-black group-hover:text-white transition-colors duration-300" />
      <span className="absolute -top-2 -right-2 text-black group-hover:text-white transition-colors duration-300 text-xs font-medium">
        {cartCount}
      </span>
    </div>
  );
}