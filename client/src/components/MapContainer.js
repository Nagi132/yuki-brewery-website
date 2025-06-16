import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { LIBRARIES, containerStyle, defaultCenter, mapOptions } from '@/data/mapData';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

const LoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4 rounded-lg">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <p className="text-gray-600">Loading map...</p>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg">
    <p>{message}</p>
  </div>
);

export function useMapLoader() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
    version: "beta"
  });

  return { isLoaded, loadError };
}

export default function MapContainer({ children, onMapLoad }) {
  const { isLoaded, loadError } = useMapLoader();

  if (loadError) {
    return <ErrorDisplay message={`Error loading Google Maps: ${loadError.message}`} />;
  }

  if (!API_KEY) {
    return <ErrorDisplay message="Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables." />;
  }

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!MAP_ID && API_KEY) {
    console.warn("NEXT_PUBLIC_GOOGLE_MAP_ID is not set in environment variables. This is recommended for using new map features and required for Advanced Markers if you migrate MarkerF in the future.");
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={14}
      options={mapOptions}
      onLoad={onMapLoad}
    >
      {children}
    </GoogleMap>
  );
}