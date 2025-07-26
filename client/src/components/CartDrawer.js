// File path: client/src/components/CartDrawer.js
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import CheckoutButton from '@/components/CheckoutButton';

const RecommendedProduct = ({ product, onClose }) => (
  <div className="w-full bg-white p-2 flex flex-col">
    <div className="relative w-full aspect-square bg-gray-50">
      <Image
        src={product.image}
        alt={product.title}
        fill
        className="object-contain"
      />
    </div>
    <div className="mt-2 text-center">
      <h4 className="text-sm font-medium">{product.title}</h4>
      <p className="text-sm text-gray-700">${product.price}</p>
      <button
        onClick={() => {
          // Add to cart logic would go here
          onClose();
        }}
        className="mt-2 w-full bg-black text-white text-xs py-2 hover:bg-gray-800"
      >
        Add
      </button>
    </div>
  </div>
);

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateCartItem, removeFromCart, getCartCount, checkout } = useCart();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [animationClass, setAnimationClass] = useState('translate-x-full');
  const drawerRef = useRef(null);

  const subtotal = cart?.subtotal || 0;
  const freeShippingThreshold = 150;
  const amountToFreeShipping = freeShippingThreshold - subtotal > 0
    ? freeShippingThreshold - subtotal
    : 0;

  // Control drawer animation
  useEffect(() => {
    // Ensure the drawer is initially positioned offscreen 
    if (isOpen) {
      // First frame: ensure we're in the DOM with translate-x-full
      document.body.style.overflow = 'hidden';

      // Second frame: start the animation by removing the transform
      const timer = setTimeout(() => {
        setAnimationClass('translate-x-0');
      }, 50); // Small delay to ensure browser has rendered the initial state

      return () => clearTimeout(timer);
    } else {
      // When closing, first update the class
      setAnimationClass('translate-x-full');

      // Then re-enable scrolling after animation finishes
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 700); // Match this to your transition duration

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Simulate fetching recommended products
  useEffect(() => {
    // In a real app, you might fetch these based on cart contents
    setRecommendedProducts([
      {
        id: 'rec-1',
        title: 'Classic Core Logo Tote',
        price: '38',
        image: '/images/10.jpg',
      },
      {
        id: 'rec-2',
        title: 'Leather Keychain',
        price: '48',
        image: '/images/11.jpg',
      },
      {
        id: 'rec-3',
        title: 'Baseball Cap',
        price: '42',
        image: '/images/12.jpg',
      }
    ]);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (lineId, currentQuantity, change) => {
    const newQuantity = Math.max(0, currentQuantity + change);

    if (newQuantity === 0) {
      removeFromCart(lineId);
    } else {
      updateCartItem(lineId, newQuantity);
    }
  };

  if (!isOpen && animationClass === 'translate-x-full') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop - closes the drawer when clicked */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform duration-700 ease-in-out ${animationClass}`}
        style={{ willChange: 'transform' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-base font-normal">CART</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors p-1"
            aria-label="Close cart"
          >
            {/* Custom slim X icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Progress to free shipping */}
        {amountToFreeShipping > 0 && (
          <div className="p-4 text-center text-sm">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="bg-black h-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
            <p>You're ${amountToFreeShipping.toFixed(2)} away from free shipping.</p>
          </div>
        )}

        {/* Cart contents */}
        <div className="flex-1 overflow-y-auto p-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="space-y-4 mb-6">
                {cart.lines.map((item) => (
                  <div key={item.id} className="flex border-b pb-4">
                    <div className="w-20 h-16 flex-shrink-0 relative overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          {item.variantTitle !== 'Default' && (
                            <p className="text-xs text-gray-500">{item.variantTitle}</p>
                          )}
                          <p className="text-sm mt-1">${item.price.toFixed(2)}</p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors h-6"
                          aria-label="Remove item"
                        >
                          {/* Custom slim X icon for removing items */}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-500"
                        >
                          <FaMinus size={10} />
                        </button>

                        <span className="w-8 text-center text-sm">{item.quantity}</span>

                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-500"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${cart.subtotal.toFixed(2)} USD</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
              </div>

              {/* Checkout button */}
              <CheckoutButton buttonText="CHECKOUT" />
            </>
          )}

          {/* You may also like */}
          {/*
          {recommendedProducts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 uppercase">You may also like</h3>
              <div className="grid grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <RecommendedProduct
                    key={product.id}
                    product={product}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>
          )}
          */}
        </div>
      </div>
    </div>
  );
}