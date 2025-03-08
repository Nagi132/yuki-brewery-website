// File path: client/src/app/shop/[slug]/page.js
// Next.js 15 compatible product page using async params

export default async function ProductPageRoute(props) {
    // Properly await the params object before accessing its properties
    const params = await props.params;
    const slug = params.slug || '';
    
    // Product images mapping
    const productImages = {
      'team-tshirt': {
        black: '/images/10.jpg',
        white: '/images/11.jpg',
        brown: '/images/12.jpg'
      },
      // Fallback for any other slug
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
      <div>
        {/* Dynamically import the ProductPage component to avoid issues with client components */}
        <div data-product={JSON.stringify(sampleProduct)}>
          {/* @ts-expect-error Async Server Component */}
          <ProductPageWrapper product={sampleProduct} />
        </div>
      </div>
    );
  }
  
  // Import the ProductPage component
  import ProductPage from '@/components/ProductPage';
  
  // Create a client wrapper if needed
  function ProductPageWrapper({ product }) {
    return <ProductPage initialProduct={product} />;
  }