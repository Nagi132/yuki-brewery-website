"use client";

import React, { useCallback, useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import MapMarker from './MapMarker';
import { useMapMarkers } from '@/hooks/useMapMarkers';
import { useMarkerInteractions } from '@/hooks/useMarkerInteractions';
import { usePlacesAPI } from '@/hooks/usePlacesAPI';
import { generateMarkerIcons } from '@/utils/markerIconUtils';

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

export default function MapDisplay() {
  const [mapInstance, setMapInstance] = useState(null);
  const [markerIcons, setMarkerIcons] = useState({ 
    default: null, 
    hover: null, 
    active: null, 
    click: null 
  });
  const [imageLoading, setImageLoading] = useState(true);

  const { markersData } = useMapMarkers();
  const {
    activeMarker,
    setActiveMarker,
    clickedMarkerId,
    hoveredMarkerId,
    handleInfoWindowClose,
    handleMarkerHover,
    handleMarkerLeave,
    handleMarkerClickWithAnimation
  } = useMarkerInteractions();
  
  const { handleMarkerClick } = usePlacesAPI(mapInstance);

  // Pre-generate high-quality SVG marker icons when Google Maps loads
  useEffect(() => {
    if (mapInstance) {
      const iconStyle = 'brewery'; // Can be changed to: 'classic', 'modern', 'elegant', 'minimal', or 'brewery'
      const iconSize = 36;
      
      setMarkerIcons(generateMarkerIcons(iconStyle, iconSize));
    }
  }, [mapInstance]);

  useEffect(() => {
    if (activeMarker && activeMarker.photoUrl) {
      setImageLoading(true);
    }
  }, [activeMarker]);

  const handleMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  const onMarkerClick = useCallback((marker) => {
    handleMarkerClickWithAnimation(marker, (markerData) => {
      handleMarkerClick(markerData, setActiveMarker);
    });
  }, [handleMarkerClickWithAnimation, handleMarkerClick, setActiveMarker]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  return (
    <>
      <style>{infoWindowStyle}</style>
      <MapContainer onMapLoad={handleMapLoad}>
        {markersData.map((marker, index) => {
          // Determine which icon to use based on state priority: click > active > hover > default
          let currentIcon = markerIcons.default;
          if (clickedMarkerId === marker.id) {
            currentIcon = markerIcons.click; // Click animation (scale 1.25)
          } else if (activeMarker && activeMarker.id === marker.id) {
            currentIcon = markerIcons.active; // Active state (blue color)
          } else if (hoveredMarkerId === marker.id) {
            currentIcon = markerIcons.hover; // Hover state (scale 1.1)
          }

          return (
            <MapMarker
              key={`marker-${marker.id}-${marker.name}-${index}`}
              marker={marker}
              index={index}
              currentIcon={currentIcon}
              activeMarker={activeMarker}
              clickedMarkerId={clickedMarkerId}
              hoveredMarkerId={hoveredMarkerId}
              onMarkerClick={onMarkerClick}
              onMarkerHover={handleMarkerHover}
              onMarkerLeave={handleMarkerLeave}
              onInfoWindowClose={handleInfoWindowClose}
              onImageLoad={handleImageLoad}
            />
          );
        })}
      </MapContainer>
    </>
  );
}