// src/app/shop/ProductGrid.js
"use client";

import React from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductGrid({ products }) {
  // Check if products is undefined or empty
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-700">No products found.</p>
        <p className="mt-2 text-zinc-500">
          {!products ? "There was an issue loading products." : "Please check back soon for our latest merchandise."}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-800"
        >
          Refresh page
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}