import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid'; 
import { getAllProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Shop | Saltfields Brewing',
  description: 'Official Saltfields Brewing merchandise. Wear your passion for craft beer.',
};

// Loading component
function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full mx-auto">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-50">
          <div className="aspect-square bg-gray-200"></div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Products wrapper component
async function ProductsWrapper() {
  let products = [];
  
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('Failed to load products:', error);
    // Continue with empty products array
  }
  
  return <ProductGrid products={products} />;
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-8">
        {/* Filters Button */}
        <div className="flex justify-end mb-6">
          <button className="border border-black px-8 py-2 uppercase text-sm tracking-wider">
            Filters
          </button>
        </div>
        
        {/* Products Grid with proper Suspense boundary */}
        <Suspense fallback={<LoadingProducts />}>
          <ProductsWrapper />
        </Suspense>
      </div>
    </div>
  );
}