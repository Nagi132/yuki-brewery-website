import React from 'react';
import { MarkerF, InfoWindowF } from '@react-google-maps/api';
import InfoWindowContent from './InfoWindowContent';

export default function MapMarker({ 
  marker, 
  index,
  currentIcon,
  activeMarker,
  clickedMarkerId,
  hoveredMarkerId,
  onMarkerClick,
  onMarkerHover,
  onMarkerLeave,
  onInfoWindowClose,
  onImageLoad
}) {
  const isActive = activeMarker && activeMarker.id === marker.id;
  
  return (
    <MarkerF
      key={`marker-${marker.id}-${marker.name}-${index}`}
      position={marker.position}
      onClick={() => onMarkerClick(marker)}
      onMouseOver={() => onMarkerHover(marker.id)}
      onMouseOut={() => onMarkerLeave(marker.id)}
      icon={currentIcon}
      title={`${marker.name} (ID: ${marker.id})`}
      zIndex={
        clickedMarkerId === marker.id
          ? 3000 + index // Highest priority for click animation
          : isActive
          ? 2000 + index
          : hoveredMarkerId === marker.id
          ? 1500 + index
          : 1000 + index
      }
    >
      {isActive && (
        <InfoWindowF
          position={marker.position}
          onCloseClick={onInfoWindowClose}
          options={{ 
            pixelOffset: typeof window !== 'undefined' && window.google 
              ? new window.google.maps.Size(0, 10) 
              : undefined 
          }}
        >
          <InfoWindowContent 
            activeMarker={activeMarker}
            onClose={onInfoWindowClose}
            onImageLoad={onImageLoad}
          />
        </InfoWindowF>
      )}
    </MarkerF>
  );
}