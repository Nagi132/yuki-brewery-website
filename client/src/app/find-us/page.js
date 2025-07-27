// client/src/app/find-us/page.js
"use client";

import React, { useState, useCallback } from 'react';
import MapDisplay from '@/components/MapDisplay'; 
import RestaurantList from '@/components/RestaurantList';
import { initialMarkersData } from '@/data/mapData';

export default function FindUsPage() {
  const [activeRestaurant, setActiveRestaurant] = useState(null); // For hover states
  const [clickedRestaurant, setClickedRestaurant] = useState(null); // For clicked states
  const [mapInstance, setMapInstance] = useState(null);
  const [handleMarkerClickFromMap, setHandleMarkerClickFromMap] = useState(null);

  // Handle restaurant hover from list
  const handleRestaurantHover = (restaurant) => {
    setActiveRestaurant(restaurant);
    // You can trigger map marker highlight here if needed
  };

  // Handle restaurant click from list - pan map to location AND show info window
  const handleRestaurantClick = (restaurant) => {
    setActiveRestaurant(restaurant);
    setClickedRestaurant(restaurant); // Track clicked state separately
    
    if (mapInstance && restaurant.position) {
      // Smooth pan and zoom with animation options
      mapInstance.panTo(restaurant.position);
      
      // Use smooth zoom transition
      const currentZoom = mapInstance.getZoom();
      const targetZoom = 14;
      
      if (currentZoom !== targetZoom) {
        // Animate zoom smoothly
        const steps = Math.abs(targetZoom - currentZoom);
        const stepSize = (targetZoom - currentZoom) / steps;
        let currentStep = 0;
        
        const animateZoom = () => {
          if (currentStep < steps) {
            currentStep++;
            const newZoom = currentZoom + (stepSize * currentStep);
            mapInstance.setZoom(newZoom);
            setTimeout(animateZoom, 50); // 50ms between steps for smooth animation
          }
        };
        
        setTimeout(animateZoom, 150); // Start zoom after pan completes
      }
    }
    
    // Trigger the info window to show location details
    if (handleMarkerClickFromMap) {
      // Delay the info window slightly so it appears after pan/zoom
      setTimeout(() => {
        handleMarkerClickFromMap(restaurant);
      }, 10);
    }
  };

  // Handle mouse leave from list
  const handleRestaurantLeave = () => {
    setActiveRestaurant(null);
  };

  // Handle map pin click - this will trigger info window AND highlight in list
  const handleMapPinClick = (restaurant) => {
    setClickedRestaurant(restaurant); // This will trigger auto-scroll in list
    // Note: setActiveRestaurant is handled by MapDisplay for info window
  };

  // Callback to get map instance when map loads
  const handleMapLoad = (map) => {
    setMapInstance(map);
  };

  // Callback to receive the handleMarkerClick function from MapDisplay
  const handleListItemClickSetup = useCallback((clickFunction) => {
    setHandleMarkerClickFromMap(() => clickFunction);
  }, []);

  return (
    <main className="bg-off-white">
      {/* Mobile: Stacked layout, Desktop: Side-by-side */}
      <div className="w-full h-[93vh] flex flex-col lg:flex-row">
        {/* Map Container - full width on mobile, flex-1 on desktop */}
        <div className="flex-1 relative h-1/2 lg:h-full">
          <MapDisplay 
            onMapLoad={handleMapLoad}
            activeRestaurant={activeRestaurant}
            setActiveRestaurant={setActiveRestaurant}
            onMapPinClick={handleMapPinClick}
            onListItemClick={handleListItemClickSetup}
          />
        </div>
        
        {/* Restaurant List - bottom half on mobile, sidebar on desktop */}
        <div className="h-1/2 lg:h-full">
          <RestaurantList 
            restaurants={initialMarkersData}
            onRestaurantHover={handleRestaurantHover}
            onRestaurantClick={handleRestaurantClick}
            onRestaurantLeave={handleRestaurantLeave}
            activeRestaurant={activeRestaurant}
            clickedRestaurant={clickedRestaurant}
          />
        </div>
      </div>
    </main>
  );
}