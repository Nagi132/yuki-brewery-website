// File path: client/src/app/shop/[slug]/page.js
// Product page that properly retrieves data from Shopify and handles async params

import { Suspense } from 'react';
import ProductPage from '@/components/ProductPage';
import LoadingProductPage from './loading';
import { getProductByHandle } from '@/lib/shopify';

// This enables dynamic rendering for the product page
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params; // No need to await params if already an object

  try {
    const product = await getProductByHandle(slug);

    if (product) {
      const pageTitle = `${product.title}`;
      const pageDescription = product.description || `Shop ${product.title} and other exclusive merchandise from Saltfields Brewing. High-quality Japanese Rice Lager inspired apparel and accessories.`;
      const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '/og-image.jpg'; // Fallback to default OG image

      return {
        title: pageTitle,
        description: pageDescription,
        openGraph: {
          title: pageTitle,
          description: pageDescription,
          url: `https://saltfieldsbrewing.com/shop/${slug}`, // Updated domain
          images: [imageUrl], // Simplified to an array of URL strings
          // type: product.title,
          siteName: 'Saltfields Brewing',
        },
      };
    }
  } catch (error) {
    console.error(`Error fetching product metadata for ${slug}:`, error);
  }

  // Fallback metadata
  return {
    title: 'Product | Saltfields Brewing',
    description: 'Explore exclusive merchandise from Saltfields Brewing. High-quality apparel and accessories inspired by Japanese Rice Lager.',
    openGraph: {
        title: 'Product | Saltfields Brewing',
        description: 'Explore exclusive merchandise from Saltfields Brewing.',
        url: `https://saltfieldsbrewing.com/shop/${slug}`,
        images: ['/og-image.jpg'], // Simplified to an array of URL strings
        // type: 'product', // Temporarily commented out for debugging
        siteName: 'Saltfields Brewing',
    },
  };
}

function ProductJsonLd({ productData }) {
  if (!productData) return null;

  const { title, description, images, id, price, variants, slug } = productData;
  const productUrl = `https://saltfieldsbrewing.com/shop/${slug}`; // Updated domain

  // Determine availability: product is available if any variant is available
  const isAvailable = variants && variants.some(variant => variant.available);
  const availability = isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

  // Assuming price comes from the main product data which is minVariantPrice
  // Shopify also provides currencyCode with the price object
  const currencyCode = productData.priceRange?.minVariantPrice?.currencyCode || 'USD'; 

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: title,
    image: images || [],
    description: description,
    sku: id, // Using Shopify product ID as SKU
    mpn: id, // Using Shopify product ID as MPN
    brand: {
      '@type': 'Brand',
      name: 'Saltfields Brewing',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: currencyCode,
      price: price, // This is minVariantPrice.amount
      itemCondition: 'https://schema.org/NewCondition',
      availability: availability,
      // priceValidUntil: "2025-12-31" // Optional: Can extend validity
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
        <>
          <ProductJsonLd productData={shopifyProduct} />
          <Suspense fallback={<LoadingProductPage />}>
            <ProductPage initialProduct={shopifyProduct} />
          </Suspense>
        </>
      );
    }


    
    // Get images for this product (default to first product if slug not found)
    const images = productImages[slug] || productImages['default'];
    
    // Sample product data with correct image paths
    const sampleProduct = {
      id: slug || 'team-tshirt',
      title: "TEAM T-SHIRT",
      slug: slug,
      description: "Our classic team t-shirt features the Saltfields Brewing logo on the front chest. Made from 100% organic cotton for maximum comfort and durability. This shirt is perfect for casual wear, supporting your favorite brewery, or attending one of our events.", // Updated brand name
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
      <>
        <ProductJsonLd productData={sampleProduct} />
        <Suspense fallback={<LoadingProductPage />}>
          <ProductPage initialProduct={sampleProduct} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    
    // Return a simple error UI
    return (
      <div className="min-h-screen bg-off-white py-16 px-4 flex items-center justify-center">
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