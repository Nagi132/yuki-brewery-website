'use client'; // Need this for client-side hover state

import { Suspense, useState } from 'react';
import Link from 'next/link';

// Category configuration - update image paths with your actual images
const CATEGORIES = [
  { 
    name: 'T-Shirts', 
    productType: 'T-Shirts', 
    imageUrl: '/images/t-shirts_front.jpg',
    backImageUrl: '/images/t-shirts_back.jpg',
    description: 'Our premium tees featuring the Saltfields Brewing logo'
  },
  { 
    name: 'Hoodies', 
    productType: 'Hoodies', 
    imageUrl: '/images/hoodies_front.jpg',
    backImageUrl: '/images/hoodies_back.jpg', 
    description: 'Stay warm in our Champion® Reverse Weave hoodies'
  },
  // Add more categories as needed
];

// Loading component for categories
function LoadingCategories() {
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

// Component that displays just the category grid
function CategoryGrid() {
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
              <img
                src={category.imageUrl}
                alt={category.name}
                className={`w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-300 ${
                  hoveredCategory === category.productType && category.backImageUrl 
                    ? 'opacity-0' 
                    : 'opacity-100'
                }`}
              />
              
              {/* Back Image (shown on hover) */}
              {category.backImageUrl && (
                <img
                  src={category.backImageUrl}
                  alt={`${category.name} alternate view`}
                  className={`w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-300 ${
                    hoveredCategory === category.productType ? 'opacity-100' : 'opacity-0'
                  }`}
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

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-normal text-center mb-20 mt-10">Shop Our Collections</h1>
        
        <Suspense fallback={<LoadingCategories />}>
          <CategoryGrid />
        </Suspense>
      </div>
    </div>
  );
}