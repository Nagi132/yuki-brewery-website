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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Extract colors from product data or provide defaults
        const colors = product.colors || [];
        
        return (
          <div key={product.id} className="flex flex-col items-start">
            {/* Product Image Container - Not forcing aspect-square */}
            <Link 
              href={`/shop/${product.slug}`} 
              className="block bg-gray-100"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden" style={{ width: imageWidth, height: imageHeight }}>
                {/* Front Image */}
                <Image
                  src={product.frontImage || '/images/placeholder.jpg'}
                  alt={product.title}
                  width={imageWidth}
                  height={imageHeight}
                  className={`object-contain transition-opacity duration-500 ${
                    hoveredProduct === product.id && product.backImage ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                />
                
                {/* Back Image (shown on hover) */}
                {product.backImage && (
                  <Image
                    src={product.backImage}
                    alt={`${product.title} - alternate view`}
                    width={imageWidth}
                    height={imageHeight}
                    className={`object-contain absolute top-0 left-0 transition-opacity duration-500 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
            </Link>
            
            {/* Product Info Container - Matched to image width */}
            <div className="mt-1 flex justify-between items-start w-full" style={{ width: imageWidth }}>
              <div>
                <span className="text-xs uppercase tracking-wide">{product.title}</span>
              </div>
              <div>
                <span className="text-xs">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
              </div>
            </div>
            
            {/* Color Swatches (if available) */}
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
        );
      })}
    </div>
  );
}