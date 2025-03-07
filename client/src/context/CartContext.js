"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CartContext = createContext(null);

// Context provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize cart from localStorage (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        // Initialize empty cart
        setCart({
          id: 'local-cart',
          lines: [],
          subtotal: 0,
          tax: 0,
          total: 0,
          checkoutUrl: null
        });
      }
    } catch (err) {
      console.error('Error initializing cart:', err);
      setError('Failed to initialize cart');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);
  
  // Simplified addToCart function that works without API
  const addToCart = async (product, variant, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Clone current cart
      const updatedCart = { ...cart };
      
      // Check if this product/variant is already in the cart
      const existingLineIndex = updatedCart.lines.findIndex(
        line => line.variantId === variant.id
      );
      
      if (existingLineIndex >= 0) {
        // Update existing line
        updatedCart.lines[existingLineIndex].quantity += quantity;
      } else {
        // Add new line
        updatedCart.lines.push({
          id: `line-${Date.now()}`,
          variantId: variant.id,
          quantity: quantity,
          title: product.title,
          variantTitle: variant.title || 'Default',
          price: variant.price,
          image: variant.image || product.images[0]
        });
      }
      
      // Recalculate totals
      updatedCart.subtotal = updatedCart.lines.reduce(
        (sum, line) => sum + (line.price * line.quantity), 
        0
      );
      updatedCart.tax = 0; // Simplified: would normally calculate based on location
      updatedCart.total = updatedCart.subtotal + updatedCart.tax;
      
      // Update cart state
      setCart(updatedCart);
      
      // TODO: When your API routes are working, you'll synchronize with Shopify here
      
      return updatedCart;
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update quantity of a line item
  const updateCartItem = async (lineId, quantity) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Clone current cart
      const updatedCart = { ...cart };
      
      if (quantity === 0) {
        // Remove the item
        updatedCart.lines = updatedCart.lines.filter(line => line.id !== lineId);
      } else {
        // Update quantity
        const lineIndex = updatedCart.lines.findIndex(line => line.id === lineId);
        if (lineIndex >= 0) {
          updatedCart.lines[lineIndex].quantity = quantity;
        }
      }
      
      // Recalculate totals
      updatedCart.subtotal = updatedCart.lines.reduce(
        (sum, line) => sum + (line.price * line.quantity), 
        0
      );
      updatedCart.tax = 0;
      updatedCart.total = updatedCart.subtotal;
      
      // Update cart state
      setCart(updatedCart);
      
      return updatedCart;
    } catch (err) {
      console.error('Error updating cart:', err);
      setError('Failed to update cart');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Remove an item from cart
  const removeFromCart = async (lineId) => {
    return updateCartItem(lineId, 0);
  };
  
  // Get cart count
  const getCartCount = () => {
    if (!cart?.lines) return 0;
    return cart.lines.reduce((total, line) => total + line.quantity, 0);
  };
  
  // Clear cart
  const clearCart = () => {
    setCart({
      id: 'local-cart',
      lines: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      checkoutUrl: null
    });
  };
  
  // Redirect to Shopify checkout - this is just a placeholder
  // since we don't have real Shopify integration yet
  const checkout = () => {
    // When properly integrated with Shopify, you would redirect to the checkout URL
    // For now, just show an alert
    alert('In a production setup, you would be redirected to Shopify checkout');
  };
  
  // Context value
  const value = {
    cart,
    isLoading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    clearCart,
    checkout
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}