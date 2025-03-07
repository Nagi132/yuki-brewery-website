import { Suspense } from 'react';
import ProductPage from '@/components/ProductPage';
import Link from 'next/link';

// Simple Suspense fallback for loading state
function LoadingProductPage() {
  return (
    <div className="min-h-screen bg-[#f0f8ff] py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error component
function ProductError() {
  return (
    <div className="min-h-screen bg-[#f0f8ff] py-16 px-4 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link href="/shop" className="inline-block bg-black text-white px-6 py-3 rounded">
          Return to shop
        </Link>
      </div>
    </div>
  );
}

export default function ProductPageRoute({ params }) {
  // Use sample product data until Shopify integration is working
  const sampleProduct = {
    id: 'sample-product',
    title: "TEAM T-SHIRT",
    slug: params.slug,
    description: "Our classic team t-shirt features the Saltfields logo on the front chest. Made from 100% cotton for maximum comfort.",
    price: 50.00,
    images: ['/images/team-tshirt-black-front.jpg'],
    colors: [
      {
        name: "Black",
        value: "black",
        hex: "#000000",
        image: "/images/team-tshirt-black-front.jpg"
      },
      {
        name: "White",
        value: "white",
        hex: "#FFFFFF",
        image: "/images/team-tshirt-white-front.jpg"
      },
      {
        name: "Brown",
        value: "brown",
        hex: "#654321",
        image: "/images/team-tshirt-brown-front.jpg"
      }
    ],
    sizes: ["S", "M", "L", "XL"]
  };

  return (
    <Suspense fallback={<LoadingProductPage />}>
      <ProductPage initialProduct={sampleProduct} />
    </Suspense>
  );
}