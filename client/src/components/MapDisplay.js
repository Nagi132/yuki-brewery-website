"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const LIBRARIES = ['marker', 'places'];

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: 40.723617,
  lng: -73.950836
};

const initialMarkersData = [
  {
    id: 1,
    name: "TØRST",
    position: { lat: 40.72361724705993, lng: -73.95083615424822 },
    address: "615 Manhattan Ave, Brooklyn, NY 11222",
    beers: "Focus on boutique beers",
    placeId: "ChIJlaFjTURZwokRvsN6V805OEk"
  },
  {
    id: 2,
    name: "C as in Charlie",
    position: { lat: 40.72566648674992, lng: -73.99272326003553 },
    address: "5 Bleecker St, New York, NY 10012",
    beers: "Various craft beers",
    placeId: "ChIJx-bMHr1ZwokRd3i_y7F3VlE"
  },
  {
    id: 3,
    name: "SSAW",
    position: { lat: 40.70940775351219, lng: -73.95392782023777 },
    address: "330 S 3rd St, Brooklyn, NY 11211, USA",
    beers: "Various craft beers",
    placeId: "ChIJ3xYJKABbwokRjhgU1mfahJk"
  },
  {
    id: 5,
    name: "OKONOMI Brooklyn",
    position: { lat: 40.71272204784484,  lng: -73.94870800051152 },
    address: "150 Ainslie St, Brooklyn, NY 11211, USA",
    beers: "Various craft beers",
    placeId: "ChIJ2YwyMVhZwokRE47dTb7x1fo"
  },
  {
    id: 6,
    name: "Taku Sando",
    position: { lat: 40.730107617858906,  lng: -73.95970007537935 },
    address: "29 Greenpoint Ave, Brooklyn, NY 11222, USA",
    beers: "n/a",
    placeId: "ChIJ8ZshVyFZwokRqQFLjNmfWmE"
  },
  {
    id: 7,
    name: "Monarch Izakaya Restaurant",
    position: { lat: 40.71621958487424,  lng: -73.9622926888718 },
    address: "146 Metropolitan Ave, Brooklyn, NY 11249, USA",
    beers: "n/a",
    placeId: "ChIJ6_M75OhZwokRiuRfFsoX7K8"
  },
  // {
  //   id: 0,
  //   name: "tmp",
  //   position: { lat: 0,  lng: 0 },
  //   address: "tmp",
  //   beers: "n/a",
  //   isAvailable: false,
  //   placeId: "tmp"
  // },
  // {
  //   id: 0,
  //   name: "tmp",
  //   position: { lat: 0,  lng: 0 },
  //   address: "tmp",
  //   beers: "n/a",
  //   isAvailable: false,
  //   placeId: "tmp"
  // },
];

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;


const infoWindowStyle = `
  .gm-style-iw-c {
    padding: 0 !important;
    border-radius: 0.5rem !important;
    background-color: transparent !important;
    box-shadow: none !important;
    max-width: none !important;
    max-height: none !important;
  }
  .gm-style-iw-d {
    overflow: hidden !important;
    padding: 0 !important;
    max-height: none !important;
  }
  .gm-ui-hover-effect, .gm-style-iw-chr {
    display: none !important;
  }
  .gm-style-iw-tc {
    display: none !important;
  }
`;

const StarIcon = ({ filled, className = "w-3.5 h-3.5" }) => (
  <svg className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


export default function MapDisplay() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [markerIcons, setMarkerIcons] = useState({ default: null });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
    version: "beta"
  });

  // Pre-generate marker icons when component mounts
  useEffect(() => {
    const createMarkerIcon = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const canvasWidth = 100; 
      const canvasHeight = 150; 
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Load and draw the can icon (no circle background)
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // 3 times the previous size - up to 300 pixels
        const maxIconSize = 220;
        let iconWidth = img.width;
        let iconHeight = img.height;
        
        // Scale to fit within maxIconSize while maintaining aspect ratio
        if (iconWidth > iconHeight) {
          if (iconWidth > maxIconSize) {
            iconHeight = (iconHeight * maxIconSize) / iconWidth;
            iconWidth = maxIconSize;
          }
        } else {
          if (iconHeight > maxIconSize) {
            iconWidth = (iconWidth * maxIconSize) / iconHeight;
            iconHeight = maxIconSize;
          }
        }
        
        // Center the can both horizontally and vertically
        const x = (canvasWidth - iconWidth) / 2;
        const y = (canvasHeight - iconHeight) / 2;
        
        ctx.drawImage(img, x, y, iconWidth, iconHeight);
        
        // Convert canvas to data URL and update state
        const dataUrl = canvas.toDataURL('image/png');
        
        setMarkerIcons({
          default: {
            url: dataUrl,
            scaledSize: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(canvasWidth, canvasHeight) : undefined,
            anchor: typeof window !== 'undefined' && window.google ? new window.google.maps.Point(canvasWidth / 2, canvasHeight / 2) : undefined,
          }
        });
      };
      
      img.onerror = (error) => {
        // Fallback to a simple colored circle if image fails to load
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#808080';
        ctx.fill();
        
        const dataUrl = canvas.toDataURL('image/png');
        setMarkerIcons({
          default: {
            url: dataUrl,
            scaledSize: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(canvasWidth, canvasHeight) : undefined,
            anchor: typeof window !== 'undefined' && window.google ? new window.google.maps.Point(canvasWidth / 2, canvasHeight / 2) : undefined,
          }
        });
      };
      
      img.src = '/images/Saltfields_brewing_can_icon.webp';
    };

    if (isLoaded) {
      createMarkerIcon();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (activeMarker && activeMarker.photoUrl) {
      setImageLoading(true);
    }
  }, [activeMarker]);

  const handleMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  const handleMarkerClick = useCallback(async (markerData) => {
    const showMarkerDetailsAndPan = (details) => {
      setActiveMarker(details);
      if (mapInstance && details.position) {
        mapInstance.panTo(details.position);
      }
    };

    if (typeof window === 'undefined' || !window.google || !window.google.maps || !window.google.maps.places) {
      console.warn("Google Maps Places API not available. Showing basic info.");
      showMarkerDetailsAndPan(markerData);
      return;
    }

    if (!markerData.placeId) {
      console.warn(`No Place ID for ${markerData.name}. Showing basic info.`);
      showMarkerDetailsAndPan(markerData);
      return;
    }

    try {
      const { Place } = await window.google.maps.importLibrary("places");
      const placeInstance = new Place({ id: markerData.placeId });

      await placeInstance.fetchFields({
        fields: [
          'displayName', 'photos', 'formattedAddress',
          'websiteURI', 'rating', 'regularOpeningHours',
          'id', 'businessStatus', 'utcOffsetMinutes' // utcOffsetMinutes is good practice for isOpen
        ]
      });
      
      let openStatus = null;
      // The isOpen() method is on the Place instance itself and uses the fetched opening hours.
      // It requires regularOpeningHours to be fetched to determine status.
      // Check if isOpen method exists and regularOpeningHours are available
      if (placeInstance.regularOpeningHours && typeof placeInstance.isOpen === 'function') {
          try {
            openStatus = placeInstance.isOpen(); // Pass no argument for "now"
          } catch (e) {
            console.warn("Error calling placeInstance.isOpen():", e.message);
            // If isOpen() exists but throws an error (like the beta channel error),
            // we treat it as status unknown.
            openStatus = null; 
          }
      } else if (placeInstance.regularOpeningHours) {
        console.warn("placeInstance.isOpen() is not available. Opening status cannot be determined directly. Consider parsing regularOpeningHours manually or waiting for API update.");
      }

      const updatedDetails = {
        ...markerData,
        fetchedName: placeInstance.displayName,
        photoUrl: placeInstance.photos && placeInstance.photos.length > 0
          ? placeInstance.photos[0].getURI({maxWidth: 800, maxHeight: 600})
          : null,
        website: placeInstance.websiteURI,
        rating: placeInstance.rating,
        isOpen: openStatus,
        address: placeInstance.formattedAddress || markerData.address,
        placeId: placeInstance.id || markerData.placeId,
        businessStatus: placeInstance.businessStatus,
      };
      showMarkerDetailsAndPan(updatedDetails);

    } catch (error) {
      console.error(`Failed to fetch place details for ${markerData.name} (Place ID: ${markerData.placeId}):`, error);
      showMarkerDetailsAndPan(markerData);
    }
  }, [mapInstance]);

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    //mapId: MAP_ID
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg">
        <p>Error loading Google Maps: {loadError.message}</p>
      </div>
    );
  }

  if (!API_KEY) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg">
        <p>Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!MAP_ID && API_KEY) {
    console.warn("NEXT_PUBLIC_GOOGLE_MAP_ID is not set in environment variables. This is recommended for using new map features and required for Advanced Markers if you migrate MarkerF in the future.");
  }

  return (
    <>
      <style>{infoWindowStyle}</style>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        {initialMarkersData.map((marker, index) => {
          return (
            <MarkerF
              key={`marker-${marker.id}-${marker.name}-${index}`}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
              icon={markerIcons.default}
              title={`${marker.name} (ID: ${marker.id})`}
              zIndex={1000 + index}
            >
              {activeMarker && activeMarker.id === marker.id && (
                <InfoWindowF
                  position={marker.position}
                  onCloseClick={handleInfoWindowClose}
                  options={{ pixelOffset: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(0, 10) : undefined }}
                >
                  <div className="w-max max-w-[280px] sm:max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
                    {activeMarker.photoUrl && (
                      <div className="relative w-full h-40 bg-gray-200">
                        {imageLoading && (
                          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-lg"></div>
                        )}
                        <img
                          src={activeMarker.photoUrl}
                          alt={activeMarker.fetchedName || activeMarker.name}
                          className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                          onLoad={() => setImageLoading(false)}
                          onError={() => {
                            console.warn(`Failed to load image: ${activeMarker.photoUrl}`);
                            setImageLoading(false);
                          }}
                        />
                         <button
                          onClick={handleInfoWindowClose}
                          className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-150 z-10"
                          aria-label="Close"
                        >
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    {!activeMarker.photoUrl && (
                       <div className="relative h-8">
                         <button
                            onClick={handleInfoWindowClose}
                            className="absolute top-2 right-2 bg-gray-500 bg-opacity-50 hover:bg-opacity-70 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-150 z-10"
                            aria-label="Close"
                          >
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                       </div>
                    )}

                    <div className={`p-3 space-y-1.5 ${!activeMarker.photoUrl ? 'pt-0' : ''}`}>
                      <h4 className="text-base font-semibold text-gray-900 truncate" title={activeMarker.fetchedName || activeMarker.name}>
                        {activeMarker.fetchedName || activeMarker.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate" title={activeMarker.address}>{activeMarker.address}</p>

                      {activeMarker.rating !== undefined && activeMarker.rating !== null && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < Math.round(activeMarker.rating)} />
                          ))}
                          <span className="ml-1.5 text-xs text-gray-500">{activeMarker.rating.toFixed(1)}</span>
                        </div>
                      )}
                      
                      {activeMarker.businessStatus === 'OPERATIONAL' && typeof activeMarker.isOpen === 'boolean' && (
                        <div className="flex items-center">
                          {activeMarker.isOpen ? (
                            <svg className="w-3.5 h-3.5 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className={`text-xs font-medium ${activeMarker.isOpen ? 'text-green-700' : 'text-red-700'}`}>
                            {activeMarker.isOpen ? 'Open now' : 'Currently closed'}
                          </span>
                        </div>
                      )}
                       {activeMarker.businessStatus && activeMarker.businessStatus !== 'OPERATIONAL' && (
                          <div className="flex items-center">
                             <svg className="w-3.5 h-3.5 text-orange-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                             </svg>
                             <span className="text-xs font-medium text-orange-700">
                              {activeMarker.businessStatus.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                             </span>
                          </div>
                       )}

                      <p className="text-xs text-gray-500 italic truncate" title={activeMarker.beers}>{activeMarker.beers}</p>

                      <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2.5 -mt-px">
                        <div className="flex-1">
                          {activeMarker.website && (
                            <a href={activeMarker.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                              Website
                            </a>
                          )}
                        </div>
                        <div className="flex-1 text-right">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMarker.address)}&query_place_id=${activeMarker.placeId || ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                          >
                            View on Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          );
        })}
      </GoogleMap>
    </>
  );
}