// client/src/components/ProductGrid.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

// Large promotional images to display in the grid
const HERO_IMAGES = [
  {
    id: 'hero-1',
    imageUrl: '/images/hoodies_front.webp',
    alt: 'Saltfields Brewing Heritage',
    categoryTitle: 'TEAM HOODIES',
    linkTo: '/shop/category/Hoodies'
  },
  {
    id: 'hero-2',
    imageUrl: '/images/t-shirts_front.webp',
    alt: 'Brewing Process',
    categoryTitle: 'TEAM TEE\'s',
    linkTo: '/shop/category/T-Shirts'
  },
  // {
  //   id: 'hero-3',
  //   imageUrl: '/images/placeholder.svg',
  //   alt: 'Saltfields Experience',
  //   title: 'More Than Beer',
  //   subtitle: 'A Lifestyle Brand',
  //   categoryTitle: 'All Products',
  //   linkTo: '/shop' // Link to main shop page
  // }
];

// Component for large promotional images
const HeroImageCard = ({ heroImage }) => {
  if (!heroImage || !heroImage.imageUrl) {
    return (
      <div className="col-span-2 bg-red-100 p-4 text-red-700">
        Hero image data is missing or incomplete.
      </div>
    );
  }

  return (
    <div
      className="col-span-2 relative overflow-hidden pb-8 sm:py-32"
      // Added min-h for mobile to ensure it occupies space
      // For `grid-auto-rows: auto`, this might be critical if content height is minimal.
      style={{ gridRow: 'span 2', minHeight: '300px' }}
    >
      <Link
        href={heroImage.linkTo}
        className="block relative h-full cursor-pointer group"
      >
        <div className="relative h-full flex flex-col">
          {/* Image section - takes most of the space */}
          <div className="flex-1 p-2 sm:p-3 pb-0">
            <div className="relative h-full overflow-hidden bg-gray-200">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 66vw, 50vw"
                quality={90}
                onError={(e) => {
                  console.error(`Error loading hero image: ${heroImage.imageUrl}`, e);
                }}
              />
              <div className="absolute inset-0 border-0 border-gray-100 to-transparent" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 text-white">
              </div>
            </div>
          </div>

          {/* Title section underneath with black line */}
          <div className="px-2 sm:px-3 pb-2 sm:pb-3 flex-shrink-0">
            <div className="border-t border-black pt-3">
              <h2 className="text-xl sm:text-xl font-semibold tracking-wide">{heroImage.categoryTitle}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

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
      className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${isSelected ? 'ring-2 ring-offset-1 ring-black' : 'border border-gray-300'}`}
      style={{ backgroundColor: colorMap[color.toLowerCase()] || color }}
      aria-label={`Select ${color} color`}
    />
  );
};

export default function ProductGrid({ products, showHeroes = true }) {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-700">No products found.</p>
      </div>
    );
  }

  const productImageMaxWidth = 500; // Increased from 390 to 500

  const createMixedGridItems = () => {
    const gridItems = [];
    let heroIndex = 0;

    products.forEach((product, index) => {
      gridItems.push({
        type: 'product',
        data: { ...product, originalProductIndex: index },
        key: `product-${product.id}`
      });

      // Only add heroes if showHeroes is true
      if (showHeroes) {
        const isFirstHeroPosition = (index === 3); // After 4th product (index 3)
        const isSubsequentHeroPosition = (index > 3 && (index - 3) % 8 === 0); // Approx every 8 products after the first

        if ((isFirstHeroPosition || isSubsequentHeroPosition) && heroIndex < HERO_IMAGES.length) {
          if (HERO_IMAGES[heroIndex] && HERO_IMAGES[heroIndex].imageUrl) {
            gridItems.push({
              type: 'hero',
              data: HERO_IMAGES[heroIndex],
              key: `hero-${heroIndex}`
            });
            heroIndex++;
          } else {
            console.warn(`Skipping hero image at index ${heroIndex} due to missing data or imageUrl.`);
          }
        }
      }
    });

    return gridItems;
  };

  const gridItems = createMixedGridItems();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8 lg:gap-x-8 lg:gap-y-10" style={{ gridAutoRows: '1fr' }}>
      {gridItems.map((item) => {
        if (item.type === 'hero') {
          return (
            <HeroImageCard
              key={item.key}
              heroImage={item.data}
            />
          );
        }

        const product = item.data;
        const colors = product.colors || [];
        const isPriorityProduct = product.originalProductIndex < 2;

        return (
          // Outermost div for each product item - ensure it fills grid cell height
          <div key={item.key} className="flex flex-col w-full h-full min-h-0">

            {/* Mobile view */}
            <div className="w-full block sm:hidden flex flex-col h-full">
              <Link
                href={`/shop/${product.slug}`}
                className="block overflow-hidden w-full rounded-md flex-1"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative w-full" style={{ paddingBottom: '120%' }}>
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="50vw"
                    quality={90}
                    priority={isPriorityProduct}
                  />
                </div>
              </Link>
              {/* Product Info section - consistent height container */}
              <div className="flex flex-col flex-shrink-0 mt-2 h-20">
                <div className="flex justify-between items-baseline w-full h-12">
                  <div className="flex-1 pr-2">
                    <h3 className="text-xs uppercase tracking-wide font-medium leading-tight line-clamp-2">{product.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs font-medium">${typeof product.price === 'number' ? product.price.toFixed(0) : product.price}</span>
                  </div>
                </div>
                <div className="flex space-x-1.5 mt-1.5 w-full h-6 items-center">
                  {colors.length > 0 && colors.slice(0, 4).map((color, colorIndex) => (
                    <ColorSwatch
                      key={colorIndex}
                      color={typeof color === 'string' ? color : color.value || 'black'}
                      isSelected={false}
                      onClick={() => { }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Medium screen view */}
            <div className="hidden sm:block lg:hidden w-full flex flex-col h-full">
              <Link
                href={`/shop/${product.slug}`}
                className="block flex-1"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div
                  className="relative w-full mx-auto aspect-[5/6] overflow-hidden rounded-md"
                  style={{ maxWidth: `${productImageMaxWidth}px` }}
                >
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className={`object-contain transition-opacity duration-500 ${hoveredProduct === product.id && product.backImage ? 'opacity-0' : 'opacity-100'
                      }`}
                    sizes="(max-width: 1023px) 33vw, 25vw"
                    quality={90}
                    priority={isPriorityProduct}
                  />
                  {product.backImage && (
                    <Image
                      src={product.backImage}
                      alt={`${product.title} - alternate view`}
                      fill
                      className={`object-contain absolute top-0 left-0 transition-opacity duration-500 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      sizes="(max-width: 1023px) 33vw, 25vw"
                      quality={90}
                    />
                  )}
                </div>
              </Link>
              {/* Product Info section - consistent height container */}
              <div
                className="flex flex-col flex-shrink-0 mt-2 mx-auto h-20"
                style={{ maxWidth: `${productImageMaxWidth}px` }}
              >
                <div className="flex justify-between items-baseline w-full h-12">
                  <div className="flex-1 pr-2">
                    <h3 className="text-xs uppercase tracking-wide font-medium leading-tight line-clamp-2">{product.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs font-medium">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                  </div>
                </div>
                <div className="flex space-x-1.5 mt-1.5 w-full h-6 items-center">
                  {colors.length > 0 && colors.map((color, colorIndex) => (
                    <ColorSwatch
                      key={colorIndex}
                      color={typeof color === 'string' ? color : color.value || 'black'}
                      isSelected={false}
                      onClick={() => { }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop view */}
            <div className="hidden lg:block w-full flex flex-col h-full">
              <Link
                href={`/shop/${product.slug}`}
                className="block flex-1"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div
                  className="relative w-full mx-auto aspect-[5/6] overflow-hidden rounded-md"
                  style={{ maxWidth: `${productImageMaxWidth}px` }}
                >
                  <Image
                    src={product.frontImage || '/images/placeholder.jpg'}
                    alt={product.title}
                    fill
                    className={`object-contain transition-opacity duration-500 ${hoveredProduct === product.id && product.backImage ? 'opacity-0' : 'opacity-100'
                      }`}
                    sizes={`${productImageMaxWidth}px`}
                    quality={90}
                    priority={isPriorityProduct}
                  />
                  {product.backImage && (
                    <Image
                      src={product.backImage}
                      alt={`${product.title} - alternate view`}
                      fill
                      className={`object-contain absolute top-0 left-0 transition-opacity duration-500 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      sizes={`${productImageMaxWidth}px`}
                      quality={90}
                    />
                  )}
                </div>
              </Link>
              {/* Product Info section - consistent height container */}
              <div
                className="flex flex-col flex-shrink-0 mt-2 mx-auto h-20"
                style={{ maxWidth: `${productImageMaxWidth}px` }}
              >
                <div className="flex justify-between items-baseline w-full h-12">
                  <div className="flex-1 pr-2">
                    <h3 className="text-xs uppercase tracking-wide font-medium leading-tight line-clamp-2">{product.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs font-medium">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                  </div>
                </div>
                <div className="flex space-x-1.5 mt-1.5 w-full h-6 items-center">
                  {colors.length > 0 && colors.map((color, colorIndex) => (
                    <ColorSwatch
                      key={colorIndex}
                      color={typeof color === 'string' ? color : color.value || 'black'}
                      isSelected={false}
                      onClick={() => { }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}