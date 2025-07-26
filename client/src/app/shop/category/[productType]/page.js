import { Suspense } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/shopify';
import { FaArrowLeft } from 'react-icons/fa';

// Loading component for product grid
function LoadingProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full mx-auto">
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

// Component to fetch and filter products by category
async function CategoryProducts({ productType }) {
  let products = [];
  
  try {
    // Fetch all products from Shopify
    const allProducts = await getAllProducts();
    
    if (allProducts && allProducts.length > 0) {
      // Filter products based on title keywords since productType is empty
      if (productType === 'T-Shirts') {
        products = allProducts.filter(p => 
          p.title && p.title.toUpperCase().includes('TEE')
        );
        
        // Define custom order for T-shirts colors
        const colorOrder = ['WHITE', 'BLACK', 'BROWN', 'GREEN', 'NAVY'];
        
        // Sort products according to predefined order
        products.sort((a, b) => {
          // Extract color from title
          const getColorFromTitle = (title) => {
            const parts = title.split(' ');
            return parts[parts.length - 1].toUpperCase(); // Assuming color is the last word
          };
          
          const colorA = getColorFromTitle(a.title);
          const colorB = getColorFromTitle(b.title);
          
          // Get the index of each color in the custom order array
          const indexA = colorOrder.indexOf(colorA);
          const indexB = colorOrder.indexOf(colorB);
          
          // If both colors are in the custom order, sort by the order
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          
          // If only one color is in the custom order, prioritize it
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          
          // If neither color is in the custom order, sort alphabetically
          return colorA.localeCompare(colorB);
        });
        
      } else if (productType === 'Hoodies') {
        products = allProducts.filter(p => 
          p.title && p.title.toUpperCase().includes('HOODIE')
        );
        
        // Define custom order for Hoodies
        const hoodieOrder = ['GREY', 'BLACK', 'GREEN','PURPLE'];
        
        // Sort products according to predefined order for hoodies
        products.sort((a, b) => {
          // Extract color from title
          const getColorFromTitle = (title) => {
            const parts = title.split(' ');
            return parts[parts.length - 1].toUpperCase(); // Assuming color is the last word
          };
          
          const colorA = getColorFromTitle(a.title);
          const colorB = getColorFromTitle(b.title);
          
          // Get the index of each color in the custom order array
          const indexA = hoodieOrder.indexOf(colorA);
          const indexB = hoodieOrder.indexOf(colorB);
          
          // If both colors are in the custom order, sort by the order
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          
          // If only one color is in the custom order, prioritize it
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          
          // If neither color is in the custom order, sort alphabetically
          return colorA.localeCompare(colorB);
        });
      } else {
        // For any other categories, try the original approach
        products = allProducts.filter(p => 
          p.productType && p.productType.toLowerCase() === productType.toLowerCase()
        );
      }
    }
  } catch (error) {
    console.error(`Failed to load products for category ${productType}:`, error);
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-700">No products found in this category.</p>
      </div>
    );
  }
  
  return <ProductGrid products={products} showHeroes={false} />;
}

export default async function CategoryPage({ params }) {
  // Get productType from URL parameters
  const resolvedParams = await params;
  const productType = resolvedParams.productType;
  const decodedType = decodeURIComponent(productType);
  
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <Link href="/shop" className="flex items-center text-zinc-600 hover:text-zinc-800 transition-colors">
            <FaArrowLeft className="mr-2" size={14} />
            Back to Shop
          </Link>
        </div>
        
        {/* Category title */}
        <h1 className="text-2xl font-normal mb-8">{decodedType}</h1>
        
        {/* Products for this category */}
        <Suspense fallback={<LoadingProductGrid />}>
          <CategoryProducts productType={decodedType} />
        </Suspense>
      </div>
    </div>
  );
} 