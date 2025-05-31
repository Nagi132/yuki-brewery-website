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

// Fetch all products for the shop page with pagination support
export async function getAllProducts() {
  if (!storeDomain || !accessToken) {
    console.error('Shopify API credentials not configured');
    return []; // Return empty array if not configured
  }

  let allProducts = [];
  let hasNextPage = true;
  let cursor = null;

  try {
    while (hasNextPage) {
      const query = `
        {
          products(first: 50${cursor ? `, after: "${cursor}"` : ''}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                handle
                description
                productType
                tags
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

      const data = await shopifyClient.request(query);
      
      // Check if data has the expected structure
      if (!data?.products?.edges) {
        console.error('Unexpected Shopify API response format:', data);
        break;
      }

      // Transform and add the current batch of products
      const products = data.products.edges.map(({ node }) => {
        // Get front and back images if available
        const images = node.images?.edges?.map(edge => edge.node.url) || [];
        
        return {
          id: node.id,
          title: node.title || 'Product',
          slug: node.handle || 'product',
          price: parseFloat(node.priceRange?.minVariantPrice?.amount || 0),
          frontImage: images[0] || '/images/placeholder.jpg',
          backImage: images[1] || null, // Back image (optional)
          description: node.description || '',
          productType: node.productType,
          tags: node.tags
        };
      });

      allProducts = [...allProducts, ...products];

      // Update pagination info
      hasNextPage = data.products.pageInfo.hasNextPage;
      cursor = data.products.pageInfo.endCursor;

      // Safety check to prevent infinite loops
      if (allProducts.length > 1000) {
        console.warn('Fetched over 1000 products, stopping pagination to prevent excessive API calls');
        break;
      }
    }

    console.log(`Successfully fetched ${allProducts.length} products from Shopify`);
    return allProducts;

  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return allProducts; // Return whatever we've fetched so far
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

// Fetch the most recent upcoming event from a specific blog
export async function getUpcomingEvent(blogHandle) {
  if (!blogHandle) {
    return null;
  }

  if (!storeDomain || !accessToken) {
    return null;
  }

  const now = new Date();

  const query = `
    query GetUpcomingEvents($blogHandle: String!) {
      blogByHandle(handle: $blogHandle) {
        articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) { 
          edges {
            node {
              title
              handle
              contentHtml
              publishedAt
              image {
                url
                altText
              }
              eventDate: metafield(namespace: "custom", key: "event_date") {
                value
              }
              eventTime: metafield(namespace: "custom", key: "event_time") {
                value
              }
              eventLocationName: metafield(namespace: "custom", key: "event_location_name") {
                value
              }
              eventLocationAddress: metafield(namespace: "custom", key: "event_location_address") {
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const variables = { blogHandle };
    const data = await shopifyClient.request(query, variables);

    if (!data?.blogByHandle?.articles?.edges?.length) {
      return null;
    }

    const allArticles = data.blogByHandle.articles.edges.map(edge => edge.node);

    const upcomingEventsFiltered = allArticles
      .filter(article => {
        if (!article.eventDate?.value) {
          return false;
        }
        const eventDateValue = new Date(article.eventDate.value);
        if (isNaN(eventDateValue.getTime())) {
          return false;
        }
        const isFutureOrToday = eventDateValue >= now;
        return isFutureOrToday;
      });
    
    const upcomingEventsSorted = upcomingEventsFiltered.sort((a, b) => new Date(a.eventDate.value) - new Date(b.eventDate.value));

    if (!upcomingEventsSorted.length) {
      return null;
    }

    const eventNode = upcomingEventsSorted[0];

    const formattedDate = eventNode.eventDate?.value
      ? new Date(eventNode.eventDate.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }).toUpperCase()
      : 'Date TBD';

    const timeDetails = eventNode.eventTime?.value || 'Time TBD';

    return {
      title: eventNode.title || 'Upcoming Event',
      slug: eventNode.handle,
      descriptionHtml: eventNode.contentHtml,
      imageUrl: eventNode.image?.url || '/images/placeholder.jpg',
      imageAlt: eventNode.image?.altText || eventNode.title || 'Event image',
      date: formattedDate,
      time: timeDetails,
      locationName: eventNode.eventLocationName?.value || 'Location TBD',
      locationAddress: eventNode.eventLocationAddress?.value || '',
      rawEventDate: eventNode.eventDate?.value,
      rawEventTime: eventNode.eventTime?.value,
      publishedAt: eventNode.publishedAt,
    };

  } catch (error) {
    return null;
  }
}

// Fetch past events from a specific blog
export async function getPastEvents(blogHandle, { limit = 5 } = {}) {
  if (!blogHandle) {
    return [];
  }

  if (!storeDomain || !accessToken) {
    return [];
  }

  const now = new Date();

  const query = `
    query GetPastEvents($blogHandle: String!) {
      blogByHandle(handle: $blogHandle) {
        articles(first: 25, sortKey: PUBLISHED_AT, reverse: true) { 
          edges {
            node {
              id
              title
              handle
              publishedAt
              image {
                url
                altText
              }
              eventDate: metafield(namespace: "custom", key: "event_date") {
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const variables = { blogHandle };
    const data = await shopifyClient.request(query, variables);

    if (!data?.blogByHandle?.articles?.edges?.length) {
      return [];
    }

    const allArticles = data.blogByHandle.articles.edges.map(edge => edge.node);
    
    const pastEventsFilteredAndSorted = allArticles
      .filter(article => {
        if (!article.eventDate?.value) {
          return false;
        }
        const eventDateValue = new Date(article.eventDate.value);
        if (isNaN(eventDateValue.getTime())) {
          return false;
        }
        const isPast = eventDateValue < now;
        return isPast;
      })
      .sort((a, b) => new Date(b.eventDate.value) - new Date(a.eventDate.value))
      .slice(0, limit);

    if (!pastEventsFilteredAndSorted.length) {
      return [];
    }

    return pastEventsFilteredAndSorted.map(eventNode => ({
      id: eventNode.id,
      title: eventNode.title || 'Past Event',
      slug: eventNode.handle,
      imageUrl: eventNode.image?.url || '/images/placeholder.jpg',
      imageAlt: eventNode.image?.altText || eventNode.title || 'Event image',
      rawEventDate: eventNode.eventDate?.value, 
    }));

  } catch (error) {
    return [];
  }
}

// Fetch a single event (article) by its handle
export async function getEventByHandle(handle) {
  if (!handle) {
    return null;
  }

  if (!storeDomain || !accessToken) {
    return null;
  }

  const query = `
    query GetEventByHandle($handle: String!) {
      blogByHandle(handle: "events") {
        articleByHandle(handle: $handle) {
          title
          contentHtml
          publishedAt
          image {
            url
            altText
          }
          eventDate: metafield(namespace: "custom", key: "event_date") {
            value
          }
          eventTime: metafield(namespace: "custom", key: "event_time") {
            value
          }
          eventLocationName: metafield(namespace: "custom", key: "event_location_name") {
            value
          }
          eventLocationAddress: metafield(namespace: "custom", key: "event_location_address") {
            value
          }
        }
      }
    }
  `;

  try {
    const variables = { handle };
    const data = await shopifyClient.request(query, variables);
    const eventNode = data?.blogByHandle?.articleByHandle;

    if (!eventNode) {
      return null;
    }

    const formattedDate = eventNode.eventDate?.value
      ? new Date(eventNode.eventDate.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }).toUpperCase()
      : 'Date TBD';

    const timeDetails = eventNode.eventTime?.value || 'Time TBD';

    return {
      title: eventNode.title || 'Event Details',
      descriptionHtml: eventNode.contentHtml, 
      imageUrl: eventNode.image?.url || '/images/placeholder.jpg',
      imageAlt: eventNode.image?.altText || eventNode.title || 'Event image',
      date: formattedDate,
      time: timeDetails,
      locationName: eventNode.eventLocationName?.value || 'Location TBD',
      locationAddress: eventNode.eventLocationAddress?.value || '',
      rawEventDate: eventNode.eventDate?.value,
      publishedAt: eventNode.publishedAt,
    };

  } catch (error) {
    return null;
  }
}