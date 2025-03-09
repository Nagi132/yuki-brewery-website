"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaArrowLeft, FaTruck, FaShieldAlt, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import CartNotification from '@/components/CartNotification';
import CartDrawer from '@/components/CartDrawer';

export default function ProductPage({ initialProduct }) {
  const [product] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.length ? product.colors[0].value : ''
  );
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    product?.colors?.length ? product.colors[0].image : product?.images?.[0]
  );
  const [showNotification, setShowNotification] = useState(false);
  const [expandShipping, setExpandShipping] = useState(false);
  const [showSizeChartLightbox, setShowSizeChartLightbox] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState(
    product?.price || 0
  );
  const [availableSizes, setAvailableSizes] = useState({});

  useEffect(() => {
    if (product?.price) {
      setSelectedVariantPrice(product.price);
    }

    // Build a map of available sizes based on inventory
    if (product?.variants && product.variants.length > 0) {
      // Create availability map for all sizes
      const sizeAvailability = {};

      if (product.sizes) {
        // Initialize all sizes as unavailable
        product.sizes.forEach(size => {
          sizeAvailability[size] = false;
        });

        // Mark sizes as available if they have inventory
        product.variants.forEach(variant => {
          if (variant.selectedOptions) {
            const sizeOption = variant.selectedOptions.find(
              opt => opt.name.toLowerCase() === "size"
            );

            if (sizeOption && variant.available) {
              sizeAvailability[sizeOption.value] = true;
            }
          }
        });

        setAvailableSizes(sizeAvailability);
      }
    }
  }, [product]);

  // Handle size selection with Shopify variant support
  const handleSizeSelect = (size) => {
    setSelectedSize(size);

    // Look for matching variant in Shopify data
    if (product.variants && product.variants.length > 0) {
      // First try to match both size and color if color is selected
      let variant = null;

      if (selectedColor) {
        variant = product.variants.find(v => {
          if (v.selectedOptions) {
            const sizeMatch = v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "size" && opt.value === size
            );
            const colorMatch = v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "color" &&
                opt.value.toLowerCase() === selectedColor.toLowerCase()
            );
            return sizeMatch && colorMatch;
          }
          return false;
        });
      }

      // If no match with color, try just size
      if (!variant) {
        variant = product.variants.find(v => {
          if (v.selectedOptions) {
            return v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "size" && opt.value === size
            );
          }
          return false;
        });
      }

      if (variant) {
        // Update price based on the found variant
        if (variant.price) {
          let newPrice;

          // Handle Shopify price format
          if (typeof variant.price === 'object' && variant.price.amount) {
            newPrice = parseFloat(variant.price.amount);
          } else {
            // Direct price value
            newPrice = parseFloat(variant.price);
          }

          setSelectedVariantPrice(newPrice);

          // If variant has an image, select it
          if (variant.image && variant.image.url) {
            setSelectedImage(variant.image.url);
          }
        }
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-blue-500 hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  // Format description text as HTML with proper bullet points
  const formatDescriptionWithBullets = (description) => {
    if (!description) return null;

    // If there's HTML description, use it
    if (product.descriptionHtml) {
      return (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      );
    }

    // For plain text, convert to HTML with bullet points
    const lines = description.split('\n');
    const htmlContent = lines
      .map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return '';

        // Clean the line by removing existing bullet markers
        const cleanLine = trimmedLine.replace(/^[-•*]\s*/, '');
        if (!cleanLine) return '';

        return `<li>${cleanLine}</li>`;
      })
      .filter(line => line !== '')
      .join('');

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `<ul style="list-style-type: disc; padding-left: 20px;">${htmlContent}</ul>`
        }}
      />
    );
  };

  // Find selected variant based on current selections for cart purposes
  const findVariant = () => {
    if (!selectedSize) {
      return null;
    }

    // Try to find in Shopify variants first
    if (product.variants && product.variants.length) {
      // First try to find by both color and size
      let variant = null;

      if (selectedColor) {
        variant = product.variants.find(v => {
          if (v.selectedOptions) {
            const colorMatch = v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "color" &&
                opt.value.toLowerCase() === selectedColor.toLowerCase()
            );
            const sizeMatch = v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "size" && opt.value === selectedSize
            );
            return colorMatch && sizeMatch;
          }
          return false;
        });
      }

      // If no match with color, try just with size
      if (!variant) {
        variant = product.variants.find(v => {
          if (v.selectedOptions) {
            return v.selectedOptions.some(
              opt => opt.name.toLowerCase() === "size" && opt.value === selectedSize
            );
          }
          return false;
        });
      }

      // If we found a Shopify variant, format it
      if (variant) {
        // Get image from variant or from selected color
        const variantImage = variant.image?.url ||
          (selectedColor && product.colors.find(c => c.value === selectedColor)?.image) ||
          product.images[0];

        // Format price based on Shopify structure
        const price = typeof variant.price === 'object' ?
          parseFloat(variant.price.amount) :
          parseFloat(variant.price || selectedVariantPrice);

        return {
          id: variant.id,
          title: variant.title || `${product.title} - ${selectedSize}`,
          price: price,
          image: variantImage,
          options: {
            color: selectedColor,
            size: selectedSize
          }
        };
      }
    }

    // Create our own variant object using the current price if no Shopify variant found
    return {
      id: `${product.id}-${selectedColor || 'default'}-${selectedSize}`,
      title: `${product.title} - ${selectedColor ? selectedColor + ', ' : ''}${selectedSize}`,
      price: selectedVariantPrice,
      image: currentColor?.image || product.images[0],
      options: {
        color: selectedColor,
        size: selectedSize
      }
    };
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const variant = findVariant();

    try {
      const updatedCart = await addToCart(product, variant, quantity);
      if (updatedCart) {
        // Open the cart drawer instead of showing notification
        setShowCartDrawer(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding this item to your cart');
    }
  };

  // Find the current color object
  const currentColor = product.colors?.find(c => c.value === selectedColor) || product.colors?.[0];

  // Handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm flex items-center">
              <Link
                href="/shop"
                className="flex items-center text-zinc-600 hover:text-zinc-800 transition-colors"
              >
                <FaArrowLeft className="mr-2" size={14} />
                <span>Back to Shop</span>
              </Link>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Product Image - Respects natural proportions */}
              <div className="relative bg-off-white overflow-hidden shadow-sm" style={{ maxHeight: '600px', width: '100%' }}>
                <div className="relative w-full" style={{ paddingBottom: '120%' }}> {/* 4:5 aspect ratio container */}
                  <Image
                    src={selectedImage || (product.images?.length ? product.images[0] : '/images/placeholder.jpg')}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Thumbnails with preserved aspect ratio */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center space-x-4 overflow-x-auto py-3">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 w-24 border overflow-hidden
          ${selectedImage === image ? 'border-1 border-black' : 'border border-gray-300'}
        `}
                      style={{ height: 'auto' }}
                    >
                      <div className="relative w-full" style={{ paddingBottom: '120%' }}> {/* Same aspect ratio as main image */}
                        <button
                          onClick={() => handleImageClick(image)}
                          aria-label={`View product image ${index + 1}`}
                          className="absolute inset-0 w-full h-full"
                        >
                          <Image
                            src={image}
                            alt={`${product.title} - image ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-off-white p-8 shadow-sm border border-gray-100">
              {/* Title and Price */}
              <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
              <p className="text-2xl font-medium mb-4">${selectedVariantPrice.toFixed(2)}</p>

              <div className="h-px bg-gray-200 w-full my-6"></div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block font-medium mb-3">Color: <span className="font-normal">{currentColor?.name || ''}</span></label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`
                          w-10 h-10 border rounded-full overflow-hidden transition-transform
                          ${selectedColor === color.value ? 'ring-2 ring-black scale-110' : 'ring-1 ring-gray-300 hover:scale-105'}
                        `}
                        onClick={() => {
                          setSelectedColor(color.value);
                          if (color.image) setSelectedImage(color.image);
                          if (selectedSize) handleSizeSelect(selectedSize); // Recalculate price with new color
                        }}
                        aria-label={`Select ${color.name} color`}
                        title={color.name}
                      >
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6" id="size-selector">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block font-medium">Select Size</label>
                    <button
                      className="text-zinc-600 hover:text-black text-sm underline"
                      onClick={() => setShowSizeChartLightbox(true)}
                      aria-label="View size chart"
                    >
                      Size Chart
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => {
                      // Check if size is available using the precomputed map
                      const isAvailable = availableSizes[size] !== false; // Default to true if not in map

                      return (
                        <button
                          key={size}
                          className={`
                            py-3 border text-center transition-colors
                            ${selectedSize === size
                              ? 'bg-black text-white border-black'
                              : isAvailable
                                ? 'bg-off-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'}
                          `}
                          onClick={() => isAvailable && handleSizeSelect(size)}
                          disabled={!isAvailable}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {!selectedSize && (
                    <p className="mt-2 text-sm text-amber-600">Please select a size</p>
                  )}
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block font-medium mb-3">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l bg-off-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaMinus size={12} />
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r bg-off-white hover:bg-gray-50"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className={`
                  w-full py-4 bg-black text-white transition-colors flex items-center justify-center
                  ${!selectedSize ? 'opacity-70 cursor-not-allowed' : 'hover:bg-zinc-800'}
                  ${isLoading ? 'animate-pulse' : ''}
                `}
                onClick={handleAddToCart}
                disabled={isLoading || !selectedSize}
              >
                <FaShoppingCart className="mr-2" />
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </button>

              {/* Product Information with Dynamic Bullet Points */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="font-medium text-lg mb-4">Product Information</h2>

                {/* Option 1: If Shopify provides HTML, use it directly */}
                {product.descriptionHtml ? (
                  <div
                    className="description-html"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : product.description ? (
                  /* Option 2: If we have plain text, try these formatting approaches */
                  <ul className="list-disc pl-5 space-y-2">
                    {/* Try to split by newlines first */}
                    {product.description.includes('\n') ?
                      product.description.split('\n').map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        return <li key={index}>{trimmed.replace(/^[-•*]\s*/, '')}</li>;
                      })
                      :
                      /* If no newlines, try commas as separators */
                      product.description.split(',').map((item, index) => {
                        const trimmed = item.trim();
                        if (!trimmed) return null;
                        return <li key={index}>{trimmed.replace(/^[-•*]\s*/, '')}</li>;
                      })
                    }
                  </ul>
                ) : (
                  <p>No description available.</p>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <button
                  className="flex items-center justify-between w-full text-left font-medium py-2"
                  onClick={() => setExpandShipping(!expandShipping)}
                >
                  <span>Shipping & Returns</span>
                  <span>{expandShipping ? <FaMinus size={12} /> : <FaPlus size={12} />}</span>
                </button>

                {expandShipping && (
                  <div className="mt-4 text-sm">
                    <p>Free Domestic Shipping on orders over $75. Purchases returned within 14 days of their original shipment date that are in new, unworn, and original condition are eligible for a full refund or for an exchange through the return center.</p>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <FaTruck className="text-zinc-600 mt-1 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Standard Shipping (3-5 business days)</p>
                          <p className="text-xs text-zinc-600">$7.95 or FREE on orders over $75</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaShieldAlt className="text-zinc-600 mt-1 mr-3" />
                        <div>
                          <p className="text-sm font-medium">Easy Returns</p>
                          <p className="text-xs text-zinc-600">Return within 14 days of delivery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Lightbox */}
      {showSizeChartLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close when clicking the background (but not when clicking inside the lightbox)
            if (e.target === e.currentTarget) {
              setShowSizeChartLightbox(false);
            }
          }}
        >
          <div className="relative bg-off-white max-w-3xl w-full max-h-[90vh] overflow-auto">
            {/* Close button */}
            <button
              onClick={() => setShowSizeChartLightbox(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black z-10 p-2"
              aria-label="Close size chart"
            >
              <FaTimes size={20} />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 text-center">Size Chart</h3>

              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/size-chart.webp"
                  alt="Size Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
      />
    </div>
  );
}