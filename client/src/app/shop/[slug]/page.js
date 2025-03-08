// File path: client/src/app/shop/[slug]/page.js
// Product page that properly retrieves data from Shopify and handles async params

import { Suspense } from 'react';
import ProductPage from '@/components/ProductPage';
import LoadingProductPage from './loading';
import { getProductByHandle } from '@/lib/shopify';

// This enables dynamic rendering for the product page
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  // Await params before accessing properties (Next.js 15 requirement)
  const { slug } = await params;
  
  try {
    // Fetch product data from Shopify
    const product = await getProductByHandle(slug);
    
    if (product) {
      return {
        title: `${product.title} | Saltfields Brewing`,
        description: product.description || 'Shop our merchandise from Saltfields Brewing.'
      };
    }
  } catch (error) {
    console.error('Error fetching product metadata:', error);
  }
  
  // Fallback metadata if product fetch fails
  return {
    title: 'Product | Saltfields Brewing',
    description: 'Shop our merchandise from Saltfields Brewing.'
  };
}

export default async function ProductPageRoute({ params }) {
  try {
    // Await params before accessing properties (Next.js 15 requirement)
    const { slug } = await params;
    
    // Fetch product data from Shopify
    const shopifyProduct = await getProductByHandle(slug);
    
    // If we successfully got data from Shopify, use it
    if (shopifyProduct) {
      return (
        <Suspense fallback={<LoadingProductPage />}>
          <ProductPage initialProduct={shopifyProduct} />
        </Suspense>
      );
    }
    
    // If Shopify data fetch failed, fall back to sample data
    // Use proper image paths that exist in the public folder
    const productImages = {
      'team-tshirt': {
        black: '/images/10.jpg',
        white: '/images/11.jpg',
        brown: '/images/12.jpg'
      },
      // Add other products as needed
      'default': {
        black: '/images/10.jpg',
        white: '/images/11.jpg',
        brown: '/images/12.jpg'
      }
    };
    
    // Get images for this product (default to first product if slug not found)
    const images = productImages[slug] || productImages['default'];
    
    // Sample product data with correct image paths
    const sampleProduct = {
      id: slug || 'team-tshirt',
      title: "TEAM T-SHIRT",
      slug: slug,
      description: "Our classic team t-shirt features the Saltfields logo on the front chest. Made from 100% organic cotton for maximum comfort and durability. This shirt is perfect for casual wear, supporting your favorite brewery, or attending one of our events.",
      price: 50.00,
      images: Object.values(images),
      colors: [
        {
          name: "Black",
          value: "black",
          hex: "#000000",
          image: images.black
        },
        {
          name: "White",
          value: "white",
          hex: "#FFFFFF",
          image: images.white
        },
        {
          name: "Brown",
          value: "brown",
          hex: "#654321",
          image: images.brown
        }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"]
    };

    return (
      <Suspense fallback={<LoadingProductPage />}>
        <ProductPage initialProduct={sampleProduct} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    
    // Return a simple error UI
    return (
      <div className="min-h-screen bg-[#f0f8ff] py-16 px-4 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-zinc-900">Something went wrong</h1>
          <p className="mb-6 text-zinc-700">There was an error loading this product.</p>
          <a href="/shop" className="inline-block bg-black text-white px-6 py-3 rounded">
            Return to shop
          </a>
        </div>
      </div>
    );
  }
}