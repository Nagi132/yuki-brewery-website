// File path: client/src/lib/shopify.js
import { GraphQLClient } from 'graphql-request';

// Check if environment variables are set
const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !accessToken) {
  console.warn(
    'Missing Shopify API credentials. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.'
  );
}

// Setup GraphQL client with your Shopify credentials
const shopifyClient = new GraphQLClient(
  `https://${storeDomain}/api/2023-07/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    timeout: 10000, // 10 seconds timeout
  }
);

// Fetch all products for the shop page
export async function getAllProducts() {
  if (!storeDomain || !accessToken) {
    console.error('Shopify API credentials not configured');
    return []; // Return empty array if not configured
  }

  const query = `
    {
      products(first: 24) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request(query);
    
    // Check if data has the expected structure
    if (!data?.products?.edges) {
      console.error('Unexpected Shopify API response format:', data);
      return [];
    }
    
    // Transform the data for your components
    return data.products.edges.map(({ node }) => {
      // Get front and back images if available
      const images = node.images?.edges?.map(edge => edge.node.url) || [];
      
      return {
        id: node.id,
        title: node.title || 'Product',
        slug: node.handle || 'product',
        price: parseFloat(node.priceRange?.minVariantPrice?.amount || 0),
        frontImage: images[0] || '/images/placeholder.jpg',
        backImage: images[1] || null, // Back image (optional)
        description: node.description || ''
      };
    });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return []; // Return empty array on error
  }
}

// Fetch a single product by handle (slug) with all variant details
export async function getProductByHandle(handle) {
  if (!handle) {
    console.error('No handle provided to getProductByHandle');
    return null;
  }

  if (!storeDomain || !accessToken) {
    console.error('Shopify API credentials not configured');
    return null;
  }

  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              image {
                url
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              quantityAvailable
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyClient.request(query);
    
    if (!data?.product) {
      console.warn(`Product not found with handle: ${handle}`);
      return null;
    }
    
    // Extract images
    const images = data.product.images?.edges?.map(edge => edge.node.url) || [];
    
    // Extract variants
    const variants = data.product.variants?.edges?.map(edge => edge.node) || [];
    
    // Extract color and size options
    const options = data.product.options || [];
    const colorOption = options.find(opt => opt.name.toLowerCase() === 'color');
    const sizeOption = options.find(opt => opt.name.toLowerCase() === 'size');
    
    const colors = colorOption 
      ? colorOption.values.map(color => {
          // Find variant with this color
          const colorVariant = variants.find(v => 
            v.selectedOptions.some(opt => opt.name.toLowerCase() === 'color' && opt.value.toLowerCase() === color.toLowerCase())
          );
          
          return {
            name: color,
            value: color.toLowerCase().replace(/\s+/g, '-'),
            hex: getColorHex(color),
            image: colorVariant?.image?.url || images[0]
          };
        })
      : [];
    
    const sizes = sizeOption ? sizeOption.values : [];
    
    // Format the product data
    return {
      id: data.product.id,
      title: data.product.title,
      slug: data.product.handle,
      description: data.product.description || '',
      descriptionHtml: data.product.descriptionHtml || '',
      price: parseFloat(data.product.priceRange?.minVariantPrice?.amount || 0),
      images: images,
      colors: colors,
      sizes: sizes,
      variants: variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        quantityAvailable: variant.quantityAvailable,
        available: variant.availableForSale,
        image: variant.image,
        selectedOptions: variant.selectedOptions
      }))
    };
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}

// Helper function to map color names to hex codes
function getColorHex(colorName) {
  const colorMap = {
    'White': '#FFFFFF',
    'Black': '#000000',
    'Grey': '#808080',
    'Gray': '#808080',
    'Brown': '#654321',
    'Tobacco': '#654321',
    'Green': '#4B5320',
    'Olive': '#808000',
    'Blue': '#0000FF',
    'Navy': '#000080',
    'Red': '#FF0000',
    'Yellow': '#FFFF00',
    'Orange': '#FFA500',
    'Purple': '#800080',
    'Pink': '#FFC0CB',
    'Beige': '#F5F5DC',
    'Tan': '#D2B48C',
    'Gold': '#FFD700',
    'Silver': '#C0C0C0',
    'Teal': '#008080',
    // Add more as needed
  };
  
  // Try case-insensitive match
  const normalizedColorName = colorName.toLowerCase();
  for (const [key, value] of Object.entries(colorMap)) {
    if (key.toLowerCase() === normalizedColorName) {
      return value;
    }
  }
  
  // If no exact match, look for partial matches
  for (const [key, value] of Object.entries(colorMap)) {
    if (normalizedColorName.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedColorName)) {
      return value;
    }
  }
  
  return '#CCCCCC'; // Default gray if no match found
}