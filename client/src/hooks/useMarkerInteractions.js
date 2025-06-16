import { useState, useCallback } from 'react';

export function useMarkerInteractions() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [clickedMarkerId, setClickedMarkerId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [transitioningMarkers, setTransitioningMarkers] = useState(new Set());

  const handleInfoWindowClose = useCallback(() => {
    setActiveMarker(null);
  }, []);

  // Smooth hover handlers with transitions
  const handleMarkerHover = useCallback((markerId) => {
    if (!transitioningMarkers.has(markerId)) {
      setHoveredMarkerId(markerId);
    }
  }, [transitioningMarkers]);

  const handleMarkerLeave = useCallback((markerId) => {
    if (!transitioningMarkers.has(markerId)) {
      setHoveredMarkerId(null);
    }
  }, [transitioningMarkers]);

  // Enhanced click handler with smooth animations
  const handleMarkerClickWithAnimation = useCallback((marker, onMarkerClick) => {
    // Add to transitioning set to prevent hover conflicts
    setTransitioningMarkers(prev => new Set(prev).add(marker.id));
    
    // Clear any existing hover state
    setHoveredMarkerId(null);
    
    // Trigger click animation
    setClickedMarkerId(marker.id);
    
    // Wait for click animation to complete
    setTimeout(() => {
      setClickedMarkerId(null);
      setTransitioningMarkers(prev => {
        const newSet = new Set(prev);
        newSet.delete(marker.id);
        return newSet;
      });
    }, 200); // Shorter duration for smoother feel
    
    // Call the original click handler
    onMarkerClick(marker);
  }, []);

  return {
    activeMarker,
    setActiveMarker,
    clickedMarkerId,
    hoveredMarkerId,
    transitioningMarkers,
    handleInfoWindowClose,
    handleMarkerHover,
    handleMarkerLeave,
    handleMarkerClickWithAnimation
  };
}