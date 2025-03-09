"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import CheckoutButton from '@/components/CheckoutButton';

export default function CartPage() {
  const { cart, isLoading, error, updateCartItem, removeFromCart, checkout } = useCart();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-12 w-12 border-t-2 border-b-2 border-black"></div>
            <p className="mt-4 text-zinc-700">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
            {error}
          </div>
          <div className="text-center">
            <Link href="/shop" className="inline-block bg-black text-white px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!cart || cart.lines.length === 0) {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          <div className="bg-off-white p-8 shadow-sm text-center">
            <p className="text-xl mb-6">Your cart is empty</p>
            <Link href="/shop" className="inline-block bg-black text-white px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle quantity change
  const handleQuantityChange = (lineId, currentQuantity, change) => {
    const newQuantity = Math.max(0, currentQuantity + change);
    
    if (newQuantity === 0) {
      removeFromCart(lineId);
    } else {
      updateCartItem(lineId, newQuantity);
    }
  };
  
  return (
    <div className="min-h-screen bg-off-white relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0),
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
      
      <div className="relative py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          
          <div className="bg-off-white shadow-sm overflow-hidden">
            {/* Cart Items */}
            <div className="divide-y divide-gray-100">
              {cart.lines.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 bg-gray-50 relative flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.variantTitle !== 'Default' && (
                      <p className="text-sm text-gray-500">{item.variantTitle}</p>
                    )}
                    <p className="text-zinc-900 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      className="p-2 bg-gray-100 hover:bg-gray-200"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Total Price */}
                  <div className="text-right min-w-[80px]">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="bg-gray-50 p-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span>Tax</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              
              <div className="mt-6 space-y-4">
              <CheckoutButton />
                
                <Link 
                  href="/shop"
                  className="block text-center text-zinc-700 hover:text-zinc-900"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}