// client/src/components/ProductGrid.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const ColorSwatch = ({ color, isSelected, onClick }) => {
  const colorMap = {
    'black': '#000000',
    'navy': '#000080',
    'white': '#FFFFFF',
    'cream': '#F5F5DC',
    'olive': '#808000',
    'brown': '#654321',
    'beige': '#F5F5DC',
    'blue': '#0000FF',
    'green': '#006400',
  };

  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 ${isSelected ? 'border-2 border-black' : 'border border-gray-300'}`}
      style={{ backgroundColor: colorMap[color.toLowerCase()] || color }}
      aria-label={`Select ${color} color`}
    />
  );
};

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-700">No products found.</p>
      </div>
    );
  }

  // Set consistent dimensions for product images
  const imageWidth = 300;
  const imageHeight = 360;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        // Extract colors from product data or provide defaults
        const colors = product.colors || [];
        
        return (
          <div key={product.id} className="flex flex-col items-start">
            {/* Mobile view (hidden on sm breakpoint and above) */}
            <div className="w-full block sm:hidden">
              <Link 
                href={`/shop/${product.slug}`} 
                className="block overflow-hidden w-full"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                </div>
              </Link>
              
              <div className="mt-1 flex justify-between items-start w-full">
                <div>
                  <span className="text-xs uppercase tracking-wide">{product.title}</span>
                </div>
                <div>
                  <span className="text-xs">${typeof product.price === 'number' ? product.price.toFixed(0) : product.price}</span>
                </div>
              </div>
              
              {colors.length > 0 && (
                <div className="flex space-x-1 mt-1 w-full">
                  {colors.slice(0, 3).map((color, index) => (
                    <ColorSwatch 
                      key={index}
                      color={typeof color === 'string' ? color : color.value || 'black'} 
                      isSelected={false}
                      onClick={() => {}} 
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Medium screen view */}
            <div className="hidden sm:block lg:hidden w-full">
              <Link 
                href={`/shop/${product.slug}`} 
                className="block overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative mx-auto" style={{ 
                  width: '100%', 
                  maxWidth: imageWidth,
                  height: 0,
                  paddingBottom: '100%' // Square aspect ratio
                }}>
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      hoveredProduct === product.id && product.backImage ? 'opacity-0' : 'opacity-100'
                    }`}
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  
                  {/* Back Image (shown on hover) */}
                  {product.backImage && (
                    <Image
                      src={product.backImage}
                      alt={`${product.title} - alternate view`}
                      fill
                      className={`object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  )}
                </div>
              </Link>
              
              {/* Product Info Container - Medium screen */}
              <div className="mt-1 flex justify-between items-start w-full" style={{ maxWidth: imageWidth, margin: '0 auto' }}>
                <div>
                  <span className="text-xs uppercase tracking-wide">{product.title}</span>
                </div>
                <div>
                  <span className="text-xs">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                </div>
              </div>
              
              {/* Color Swatches - Medium screen */}
              {colors.length > 0 && (
                <div className="flex space-x-1 mt-1 w-full" style={{ maxWidth: imageWidth, margin: '0 auto' }}>
                  {colors.map((color, index) => (
                    <ColorSwatch 
                      key={index}
                      color={typeof color === 'string' ? color : color.value || 'black'} 
                      isSelected={false}
                      onClick={() => {}} 
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Desktop view - Original code from your version */}
            <div className="hidden lg:block">
              <Link 
                href={`/shop/${product.slug}`} 
                className="block overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative" style={{ width: imageWidth, height: imageHeight }}>
                  {/* Front Image */}
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={`transition-opacity duration-500 ${
                      hoveredProduct === product.id && product.backImage ? 'opacity-0' : 'opacity-100'
                    }`}
                    sizes={`${imageWidth}px`}
                    priority
                  />
                  
                  {/* Back Image (shown on hover) */}
                  {product.backImage && (
                    <Image
                      src={product.backImage}
                      alt={`${product.title} - alternate view`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={`absolute top-0 left-0 transition-opacity duration-500 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      sizes={`${imageWidth}px`}
                    />
                  )}
                </div>
              </Link>
              
              {/* Product Info Container - Exactly as in original */}
              <div className="mt-1 flex justify-between items-start w-full" style={{ width: imageWidth }}>
                <div>
                  <span className="text-xs uppercase tracking-wide">{product.title}</span>
                </div>
                <div>
                  <span className="text-xs">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                </div>
              </div>
              
              {/* Color Swatches - Exactly as in original */}
              {colors.length > 0 && (
                <div className="flex space-x-1 mt-1" style={{ width: imageWidth }}>
                  {colors.map((color, index) => (
                    <ColorSwatch 
                      key={index}
                      color={typeof color === 'string' ? color : color.value || 'black'} 
                      isSelected={false}
                      onClick={() => {}} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}