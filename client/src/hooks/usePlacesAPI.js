import { useCallback } from 'react';

export function usePlacesAPI(mapInstance) {
  const handleMarkerClick = useCallback(async (markerData, setActiveMarker) => {
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
          'id', 'businessStatus', 'utcOffsetMinutes'
        ]
      });

      let openStatus = null;
      // Check if isOpen method exists and regularOpeningHours are available
      if (placeInstance.regularOpeningHours && typeof placeInstance.isOpen === 'function') {
        try {
          openStatus = placeInstance.isOpen(); // Pass no argument for "now"
        } catch (e) {
          console.warn("Error calling placeInstance.isOpen():", e.message);
          openStatus = null;
        }
      } else if (placeInstance.regularOpeningHours) {
        console.warn("placeInstance.isOpen() is not available. Opening status cannot be determined directly.");
      }

      const updatedDetails = {
        ...markerData,
        fetchedName: placeInstance.displayName,
        photoUrl: placeInstance.photos && placeInstance.photos.length > 0
          ? placeInstance.photos[0].getURI({ maxWidth: 800, maxHeight: 600 })
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

  return {
    handleMarkerClick
  };
}