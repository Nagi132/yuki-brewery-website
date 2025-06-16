import { useState, useEffect } from 'react';
import { loadLocationData } from '@/utils/locationDataProcessor';
import { initialMarkersData } from '@/data/mapData';

export function useMapMarkers() {
  const [markersData, setMarkersData] = useState(initialMarkersData);

  // Load location data from local storage on component mount
  useEffect(() => {
    const savedData = loadLocationData();
    if (savedData && savedData.locations && savedData.locations.length > 0) {
      console.log(`Loading ${savedData.locations.length} locations from saved data`);
      setMarkersData(savedData.locations);
    }
  }, []);

  return {
    markersData,
    setMarkersData
  };
}