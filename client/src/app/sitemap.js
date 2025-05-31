import { getAllProducts } from '@/lib/shopify';

const URL = 'https://saltfieldsbrewing.com';

export default async function sitemap() {
  const staticRoutes = [
    { url: `${URL}/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${URL}/find-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${URL}/beer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${URL}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${URL}/carry`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${URL}/returns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    // Note: cart and thank-you pages are excluded as they shouldn't be indexed
  ];

  let productRoutes = [];
  try {
    // Fetch all products using the updated getAllProducts function with pagination
    const products = await getAllProducts(); 
    productRoutes = products.map((product) => ({
      url: `${URL}/shop/${product.slug}`, 
      lastModified: new Date(), // Ideally, use a product's actual lastModified date from Shopify if available
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // If you have an events section and a way to fetch all event slugs:
  // const events = await getAllEventSlugs(); // You would need a function like this
  // const eventRoutes = events.map(event => ({
  //   url: `${URL}/events/${event.slug}`,
  //   lastModified: new Date(event.updatedAt || event.publishedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [
    ...staticRoutes, 
    ...productRoutes, 
    // ...eventRoutes
  ];
} 