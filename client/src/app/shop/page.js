import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Shop All Products - Saltfields Brewing',
  description: 'Browse all products at Saltfields Brewing. Shop our exclusive Japanese Rice Lager inspired t-shirts, hoodies, hats, stickers, and more quality merchandise.',
  keywords: ['Saltfields Brewing shop', 'Saltfields Brewing merchandise', 'Japanese beer apparel', 'craft beer t-shirts', 'brewery hoodies', 'beer stickers', 'Saltfields Brewing products'],
  openGraph: {
    title: 'Shop Saltfields Brewing Products',
    description: 'Explore unique merchandise from Saltfields Brewing, including apparel and accessories inspired by Japanese Rice Lager.',
    url: 'https://saltfieldsbrewing.com/shop',
    images: [
      {
        url: '/og-shop-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saltfields Brewing Shop - T-shirts, Hoodies, and More',
      },
    ],
  },
};

// Loading component for products
function LoadingProducts() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-50">
          <div className="aspect-square bg-gray-200"></div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component to fetch and display products
async function ProductsDisplay() {
  const products = await getAllProducts();
  return <ProductGrid products={products} />;
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-8xl mx-auto px-4 lg:px-6 xl:px-8 py-12">
        <h1 className="text-2xl font-normal text-center mb-20 mt-10">Shop All Products</h1>
        
        <Suspense fallback={<LoadingProducts />}>
          <ProductsDisplay />
        </Suspense>
      </div>
    </div>
  );
}