// client/src/components/MapDisplay.js
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
  
  /* Smooth map transitions */
  .gm-style > div {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) !important;
  }
`;

export default function MapDisplay({ 
  onMapLoad, 
  activeRestaurant = null, 
  setActiveRestaurant,
  onMapPinClick,
  onListItemClick
}) {
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
      
      // Call the parent's onMapLoad callback if provided
      if (onMapLoad) {
        onMapLoad(mapInstance);
      }
    }
  }, [mapInstance, onMapLoad]);

  // Expose handleMarkerClick function to parent component
  useEffect(() => {
    if (onListItemClick && handleMarkerClick) {
      // Create a bound function that already includes setActiveMarker
      const boundHandleMarkerClick = (restaurant) => {
        if (restaurant) {
          handleMarkerClick(restaurant, setActiveMarker);
        }
      };
      onListItemClick(boundHandleMarkerClick);
    }
  }, [onListItemClick, handleMarkerClick, setActiveMarker]);

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
      // Also update the restaurant list selection
      if (setActiveRestaurant) {
        setActiveRestaurant(markerData);
      }
      // Trigger the map pin click callback for list scrolling
      if (onMapPinClick) {
        onMapPinClick(markerData);
      }
    });
  }, [handleMarkerClickWithAnimation, handleMarkerClick, setActiveMarker, setActiveRestaurant, onMapPinClick]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  return (
    <>
      <style>{infoWindowStyle}</style>
      <MapContainer onMapLoad={handleMapLoad}>
        {markersData.map((marker, index) => {
          // Determine which icon to use based on state priority: click > active > list hover > map hover > default
          let currentIcon = markerIcons.default;
          
          // Check if this marker is highlighted from the restaurant list
          const isListHighlighted = activeRestaurant && activeRestaurant.id === marker.id;
          
          if (clickedMarkerId === marker.id) {
            currentIcon = markerIcons.click; // Click animation (scale 1.25)
          } else if (activeMarker && activeMarker.id === marker.id) {
            currentIcon = markerIcons.active; // Active state (yellow color)
          } else if (isListHighlighted) {
            currentIcon = markerIcons.hover; // List hover state (highlighted)
          } else if (hoveredMarkerId === marker.id) {
            currentIcon = markerIcons.hover; // Map hover state (scale 1.1)
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