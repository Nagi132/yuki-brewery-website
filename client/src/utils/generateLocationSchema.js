// Generate JSON-LD schema for restaurant/bar locations
export function generateLocationSchema(locations) {
  // Create individual LocalBusiness schema for each location
  const locationSchemas = locations.map(location => ({
    '@type': 'LocalBusiness',
    '@id': `https://saltfieldsbrewing.com/find-us#location-${location.id}`,
    name: location.name,
    description: `Find Saltfields Brewing Japanese Rice Lager at ${location.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.split(',')[0], // First part before comma
      addressLocality: location.address.split(',')[1]?.trim(), // City
      addressRegion: location.address.split(',')[2]?.trim()?.split(' ')[0], // State (NY)
      postalCode: location.address.match(/\d{5}(-\d{4})?/)?.[0], // ZIP code
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.position.lat,
      longitude: location.position.lng
    },
    url: location.website || undefined,
    // Add brewery connection
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Saltfields Brewing Japanese Rice Lager',
        brand: {
          '@type': 'Brand',
          name: 'Saltfields Brewing'
        }
      }
    },
    // Connect to main brewery
    provider: {
      '@type': 'Brewery',
      name: 'Saltfields Brewing',
      url: 'https://saltfieldsbrewing.com'
    }
  }));

  // Main schema wrapper
  const mainSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Saltfields Brewing Beer Locations',
    description: 'Find restaurants, bars, and retailers serving Saltfields Brewing Japanese Rice Lager',
    numberOfItems: locations.length,
    itemListElement: locationSchemas.map((schema, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: schema
    }))
  };

  return mainSchema;
}