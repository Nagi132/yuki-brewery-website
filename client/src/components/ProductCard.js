"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Extract product information with fallbacks
  const { 
    title = 'Product', 
    price = 0, 
    frontImage = '/images/placeholder.jpg', 
    backImage = null, 
    slug = '' 
  } = product || {};

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link href={`/shop/${slug}`} className="block">
      <div 
        className="relative transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Images with Hover Effect */}
        <div className="relative aspect-square overflow-hidden bg-white">
          {/* Front Image */}
          {!imageError && (
            <div 
              className={`absolute inset-0 transition-opacity duration-500 ${isHovered && backImage ? 'opacity-0' : 'opacity-100'}`}
            >
              <Image 
                src={frontImage} 
                alt={`${title} - front`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain"
                priority
                onError={handleImageError}
              />
            </div>
          )}
          
          {/* Back Image (shown on hover) */}
          {!imageError && backImage && (
            <div 
              className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image 
                src={backImage} 
                alt={`${title} - back`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain"
                onError={handleImageError}
              />
            </div>
          )}
          
          {/* Fallback for image error */}
          {imageError && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">{title}</span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="mt-3 text-center">
          <h3 className="text-sm uppercase">{title}</h3>
          <p className="mt-1">${typeof price === 'number' ? price.toFixed(2) : '0.00'}</p>
        </div>
      </div>
    </Link>
  );
}