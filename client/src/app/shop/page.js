import { Suspense } from 'react';
import ProductGrid from './ProductGrid'; 
import { getAllProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Shop | Saltfields Brewing',
  description: 'Official Saltfields Brewing merchandise. Wear your passion for craft beer.',
};

// Loading component
function LoadingProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-md"></div>
          <div className="space-y-2 mt-3">
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
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
    <div className="min-h-screen bg-[#f0f8ff] relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0),
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative py-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-wide text-zinc-900 mb-4">SHOP</h1>
            <p className="text-zinc-700 text-lg max-w-2xl mx-auto mb-8">
              Official Saltfields Brewing merchandise. Wear your passion for craft beer.
            </p>
          </div>

          {/* Products Grid with proper Suspense boundary */}
          <Suspense fallback={<LoadingProducts />}>
            <ProductsWrapper />
          </Suspense>

          {/* Shipping Notice */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-zinc-700">
              Free shipping on all orders over $75. International shipping available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}