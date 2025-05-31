/**
 * CATEGORIZE_TEMP.JS
 * 
 * This file contains the CategoryGrid component that was temporarily removed from the shop page.
 * The category functionality remains available but is not currently being used.
 * 
 * The category pages at /shop/category/[productType] still work for SEO purposes,
 * but the main shop page now shows all products directly using ProductGrid.
 * 
 * This file preserves the categorization functionality for potential future use.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Category configuration - update image paths with your actual images
const CATEGORIES = [
  { 
    name: 'T-Shirts', 
    productType: 'T-Shirts', 
    imageUrl: '/images/t-shirts_front.webp',
    backImageUrl: '/images/t-shirts_back.webp',
    description: 'Our premium tees featuring the Saltfields Brewing logo'
  },
  { 
    name: 'Hoodies', 
    productType: 'Hoodies', 
    imageUrl: '/images/hoodies_front.webp',
    backImageUrl: '/images/hoodies_back.webp', 
    description: 'Stay warm in our Champion® Reverse Weave hoodies with Saltfields Brewing designs'
  },
  // Add more categories as needed
];

// Loading component for categories (can remain here or be a separate component if used elsewhere)
export function LoadingCategories() { // Export if needed by parent for Suspense fallback prop
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full mx-auto">
      {[...Array(CATEGORIES.length || 2)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-50">
          <div className="aspect-square bg-gray-200"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
}

export default function CategoryGrid() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {CATEGORIES.map((category) => (
        <Link 
          key={category.productType} 
          href={`/shop/category/${encodeURIComponent(category.productType)}`}
          className="block transition-opacity hover:opacity-100"
          onMouseEnter={() => setHoveredCategory(category.productType)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="bg-gray-100 overflow-hidden">
            <div className="aspect-square relative">
              {/* Front Image */}
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={90}
                className={`object-cover transition-opacity duration-300 ${
                  hoveredCategory === category.productType && category.backImageUrl 
                    ? 'opacity-0' 
                    : 'opacity-100'
                }`}
                priority={false}
              />
              
              {/* Back Image (shown on hover) */}
              {category.backImageUrl && (
                <Image
                  src={category.backImageUrl}
                  alt={`${category.name} alternate view`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={90}
                  className={`object-cover transition-opacity duration-300 ${
                    hoveredCategory === category.productType ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority={false}
                />
              )}
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm uppercase tracking-wide">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
} 