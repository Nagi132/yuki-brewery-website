"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // Will be controlled by parent div's height
  borderRadius: '0.5rem', // Match tailwind rounded-lg
};

// Placeholder center (e.g., New York City) - you can change this
const defaultCenter = {
  lat: 40.723617, // Centered more towards TØRST
  lng: -73.950836
};

// Placeholder restaurant data
const initialMarkersData = [
  {
    id: 1,
    name: "TØRST", // Updated to TØRST
    position: { lat: 40.72361724705993, lng: -73.95083615424822 }, // Your provided coordinates
    address: "615 Manhattan Ave, Brooklyn, NY 11222",
    beers: "Focus on boutique beers",
    isAvailable: true,
    placeId: "ChIJlaFjTURZwokRvsN6V805OEk" // You should replace this with the correct Place ID you found
  },
  {
    id: 2,
    name: "C as in Charlie", 
    position: { lat: 40.72566648674992, lng: -73.99272326003553 },
    address: "5 Bleecker St, New York, NY 10012",
    beers: "Various craft beers",
    isAvailable: true,
    placeId: "ChIJx-bMHr1ZwokRd3i_y7F3VlE" 
  },
  {
    id: 3,
    name: "Sold Out Tap Example",
    position: { lat: 40.7280, lng: -73.9480 },
    address: "321 Outof Stock Ave, Brooklyn, NY",
    beers: "Usually has good stuff",
    isAvailable: false,
    placeId: null
  },
];

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapDisplay() {
  const [activeMarker, setActiveMarker] = useState(null); // Will store original marker data + fetched place details
  const [mapInstance, setMapInstance] = useState(null);
  const [placesService, setPlacesService] = useState(null);

  const handleMapLoad = useCallback((map) => {
    setMapInstance(map);
    if (window.google && window.google.maps && window.google.maps.places) {
      setPlacesService(new window.google.maps.places.PlacesService(map));
    }
  }, []);

  const handleMarkerClick = useCallback((markerData) => {
    if (!placesService || !markerData.placeId) {
      // No service or no placeId, just show basic info
      setActiveMarker(markerData);
      return;
    }

    // Fetch place details
    const request = {
      placeId: markerData.placeId,
      fields: ['name', 'photos', 'formatted_address', 'website', 'rating', 'opening_hours'] // Request specific fields
    };

    placesService.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        setActiveMarker({
          ...markerData, // Original data
          fetchedName: place.name, // Official name
          photoUrl: place.photos && place.photos.length > 0 ? place.photos[0].getUrl({maxWidth: 400, maxHeight: 300}) : null,
          website: place.website,
          rating: place.rating,
          isOpen: place.opening_hours ? place.opening_hours.isOpen() : null, // Check if open now
        });
      } else {
        console.error(`PlacesService failed for ${markerData.name}: ${status}`);
        setActiveMarker(markerData); // Show original data on error
      }
    });
  }, [placesService]);

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    // styles array removed to revert to default map colors
  };

  // This effect will run once LoadScript has loaded the Google Maps API
  // However, the GoogleMap component itself is what makes `window.google.maps` reliably available within its context.
  // A better approach for complex interactions with google.maps objects is often via the map instance from GoogleMap's onLoad.

  if (!API_KEY) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg">
        <p>Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.</p>
      </div>
    );
  }
  
  // Define getMarkerIcon outside the map render to ensure it has access to window.google.maps when map is loaded.
  const getMarkerIcon = (isAvailable) => {
    if (!mapInstance || !window.google || !window.google.maps) {
      // Return undefined or a default if maps API isn't ready, though LoadScript should handle this.
      // Forcing a simple string URL if not loaded is also an option for graceful degradation.
      return isAvailable ? undefined : "http://maps.google.com/mapfiles/ms/icons/grey.png";
    }
    if (isAvailable) {
      return undefined; // Default marker
    }
    return {
      url: "http://maps.google.com/mapfiles/ms/icons/grey.png",
      scaledSize: new window.google.maps.Size(32, 32),
    };
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['marker', 'places']} // Added 'places' library
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14} // Slightly more zoomed in for local view
        options={mapOptions}
        onLoad={handleMapLoad} // Get map instance and initialize PlacesService
      >
        {initialMarkersData.map((marker) => (
          <MarkerF
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker)}
            icon={getMarkerIcon(marker.isAvailable)}
          >
            {activeMarker && activeMarker.id === marker.id && (
              <InfoWindowF
                position={marker.position}
                onCloseClick={handleInfoWindowClose}
                options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
              >
                <div className="bg-white r shadow-lg max-w-xs w-80 font-sans overflow-hidden">
                  {activeMarker.photoUrl && (
                    <img 
                      src={activeMarker.photoUrl} 
                      alt={activeMarker.fetchedName || activeMarker.name} 
                      className="w-full h-48 object-cover mb-0"
                    />
                  )}
                  <div className={`p-3 ${activeMarker.photoUrl ? 'rounded-b-lg' : 'rounded-lg'}`}>
                    <h4 className="text-md font-semibold text-zinc-800 mb-0.5 truncate" title={activeMarker.fetchedName || activeMarker.name}>
                      {activeMarker.fetchedName || activeMarker.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mb-2 truncate" title={activeMarker.address}>{activeMarker.address}</p>
                    
                    <div className="text-xs text-zinc-600 mb-2 flex items-center space-x-2">
                      {/*{activeMarker.rating && (
                        <span className="inline-flex items-center">
                          <svg aria-hidden="true" className="w-3 h-3 text-amber-400 mr-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.971a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.971c.3.921-.755 1.688-1.54 1.118l-3.388-2.461a1 1 0 00-1.176 0l-3.388 2.461c-.784.57-1.838-.197-1.539-1.118l1.287-3.971a1 1 0 00-.364-1.118L2.024 9.398c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.971z"/></svg>
                          {activeMarker.rating}
                        </span>
                      )}*/}
                      {typeof activeMarker.isOpen === 'boolean' && activeMarker.rating && (
                        <span className="text-zinc-300">|</span>
                      )}
                      {typeof activeMarker.isOpen === 'boolean' && (
                        <span className={`${activeMarker.isOpen ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                          {activeMarker.isOpen ? 'Open' : 'Closed'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 mb-3 italic truncate" title={activeMarker.beers}>Carries: {activeMarker.beers}</p>
                    
                    {!activeMarker.isAvailable && 
                      <p className="text-xs font-semibold text-red-600 mb-3">Currently Sold Out</p>}
                    
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200">
                      {activeMarker.website ? (
                        <a href={activeMarker.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                          Website
                        </a>
                      ) : ( <div></div>) /* Placeholder to maintain spacing */}
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMarker.address)}&query_place_id=${activeMarker.placeId || ''}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        Details on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
} 