// Utility to process Google Maps exported CSV data
import Papa from 'papaparse';

/**
 * Processes Google Maps exported CSV data and converts it to MapDisplay format
 * @param {string} csvData - Raw CSV data from Google Takeout
 * @returns {Array} - Array of location objects formatted for MapDisplay
 */
export const processGoogleMapsCSV = (csvData) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        try {
          const locations = results.data
            .filter(row => row.Title && row.Title.trim()) // Filter out empty rows
            .map((row, index) => ({
              id: index + 1,
              name: row.Title,
              position: {
                // These will need to be geocoded if not provided
                lat: row.Latitude ? parseFloat(row.Latitude) : null,
                lng: row.Longitude ? parseFloat(row.Longitude) : null
              },
              address: row.Address || row.Location || 'Address not available',
              placeId: row.PlaceId || `place_${index}`,
              url: row.URL || null,
              category: row.Category || 'Restaurant/Bar'
            }));
          
          resolve(locations);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

/**
 * Geocodes an address using Google Maps Geocoding API
 * @param {string} address - Address to geocode
 * @param {string} apiKey - Google Maps API key
 * @returns {Object} - Coordinates object with lat/lng
 */
export const geocodeAddress = async (address, apiKey) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        placeId: data.results[0].place_id
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

/**
 * Processes locations and geocodes missing coordinates
 * @param {Array} locations - Array of location objects
 * @param {string} apiKey - Google Maps API key
 * @returns {Array} - Array of locations with coordinates
 */
export const geocodeLocations = async (locations, apiKey) => {
  const processedLocations = [];
  
  for (const location of locations) {
    if (!location.position.lat || !location.position.lng) {
      console.log(`Geocoding ${location.name}...`);
      const coords = await geocodeAddress(location.address, apiKey);
      
      if (coords) {
        location.position = {
          lat: coords.lat,
          lng: coords.lng
        };
        location.placeId = coords.placeId;
      }
      
      // Add delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    processedLocations.push(location);
  }
  
  return processedLocations;
};

/**
 * Saves processed location data to local storage
 * @param {Array} locations - Processed location data
 * @param {string} listName - Name of the list
 */
export const saveLocationData = (locations, listName = 'carry-locations') => {
  const dataToSave = {
    lastUpdated: new Date().toISOString(),
    listName,
    locations
  };
  
  localStorage.setItem(`maps-${listName}`, JSON.stringify(dataToSave));
};

/**
 * Loads location data from local storage
 * @param {string} listName - Name of the list
 * @returns {Object|null} - Saved location data or null
 */
export const loadLocationData = (listName = 'carry-locations') => {
  try {
    const saved = localStorage.getItem(`maps-${listName}`);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading location data:', error);
    return null;
  }
}; 