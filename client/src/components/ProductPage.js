"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ initialProduct }) {
  const [product] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.length ? product.colors[0].value : ''
  );
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, isLoading } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0f8ff] py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-blue-500 hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  // Create a simplified variant based on selection
  const createSimpleVariant = () => {
    if (!selectedSize || !selectedColor) return null;
    
    // Find the color object for the image
    const colorObj = product.colors.find(c => c.value === selectedColor);
    
    // Create a simple variant object
    return {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      title: `${product.title} - ${selectedColor}, ${selectedSize}`,
      price: product.price,
      image: colorObj?.image || product.images[0],
      options: {
        color: selectedColor,
        size: selectedSize
      }
    };
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      // Scroll to size selector
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Create a simple variant for the cart
    const variant = createSimpleVariant();
    
    try {
      // Add item to cart using cart context
      const updatedCart = await addToCart(product, variant, 1);
      
      if (updatedCart) {
        alert(`Added ${product.title} in ${selectedColor}, size ${selectedSize} to cart`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding this item to your cart');
    }
  };

  // Find the current color object
  const currentColor = product.colors.find(c => c.value === selectedColor) || product.colors[0];

  return (
    <div className="min-h-screen bg-[#f0f8ff] relative">
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
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-white">
              <Image
                src={currentColor?.image || product.images[0] || '/images/placeholder.jpg'}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Product Details */}
            <div>
              {/* Breadcrumb */}
              <div className="mb-6">
                <nav className="text-sm">
                  <Link href="/shop" className="text-zinc-500 hover:text-zinc-800">
                    Shop
                  </Link>
                  <span className="mx-2 text-zinc-300">/</span>
                  <span className="text-zinc-800">{product.title}</span>
                </nav>
              </div>

              {/* Title and Price */}
              <h1 className="text-3xl md:text-4xl font-serif font-normal mb-4">{product.title}</h1>
              <p className="text-xl mb-2">${product.price?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-zinc-500 mb-6">
                or as low as ${(product.price / 4).toFixed(2)}/mo. with Afterpay
                <span className="inline-block ml-1 cursor-help" title="Interest-free installments">
                  ⓘ
                </span>
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block font-medium mb-2">Select Color</label>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`
                          w-16 h-16 border rounded-sm overflow-hidden
                          ${selectedColor === color.value ? 'ring-2 ring-black' : 'ring-1 ring-gray-300'}
                        `}
                        onClick={() => setSelectedColor(color.value)}
                        aria-label={`Select ${color.name} color`}
                      >
                        <div className="w-full h-full relative">
                          <div 
                            className="absolute inset-0" 
                            style={{ 
                              backgroundColor: color.hex,
                              backgroundImage: color.image ? `url(${color.image})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm">{currentColor?.name || ''}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-8" id="size-selector">
                  <label className="block font-medium mb-2">Select Size</label>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`
                          py-3 border text-center transition
                          ${selectedSize === size 
                            ? 'bg-black text-white' 
                            : 'bg-white text-black hover:bg-gray-100'}
                        `}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="mt-2 text-sm text-red-500">Please select a size</p>
                  )}
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                className={`
                  w-full py-4 bg-black text-white transition
                  ${!selectedSize ? 'opacity-70 cursor-not-allowed' : 'hover:bg-zinc-800'}
                  ${isLoading ? 'animate-pulse' : ''}
                `}
                onClick={handleAddToCart}
                disabled={isLoading || !selectedSize}
              >
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </button>

              {/* Product Information */}
              <div className="mt-12">
                <h2 className="font-medium text-lg mb-4">Product Information</h2>
                {product.descriptionHtml ? (
                  <div 
                    className="prose max-w-none" 
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p>{product.description || 'No description available.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}