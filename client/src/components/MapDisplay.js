"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { loadLocationData } from '@/utils/locationDataProcessor';
// Import high-quality map pin icons from react-icons
import { IoLocationSharp, IoLocation, IoPin } from 'react-icons/io5';
import { MdLocationPin, MdPlace, MdPinDrop } from 'react-icons/md';
import { FaMapMarkerAlt, FaMapMarker, FaMapPin } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { TbMapPin, TbMapPinFilled } from 'react-icons/tb';

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

// Updated with all 38 restaurants from Google Places API extraction
const initialMarkersData = [
  {
    "id": 1,
    "name": "StEight(behind KUNIYA HAIR)",
    "position": {
      "lat": 40.7182225,
      "lng": -73.9917547
    },
    "address": "116 Eldridge St, New York, NY 10002, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJldB8qZNZwokRYwDAq_cgDro"
  },
  {
    "id": 2,
    "name": "Shuya",
    "position": {
      "lat": 40.7460834,
      "lng": -73.9775784
    },
    "address": "517 3rd Ave, New York, NY 10016, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJl1mCTwBZwokR2pxwHafrjJE"
  },
  {
    "id": 3,
    "name": "Cafe O'Te by HOUSE Brooklyn",
    "position": {
      "lat": 40.7245089,
      "lng": -73.9539175
    },
    "address": "38 Norman Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ417z_aJZwokROPV2Oz3myKg"
  },
  {
    "id": 4,
    "name": "TabeTomo",
    "position": {
      "lat": 40.7269404,
      "lng": -73.9831557
    },
    "address": "131 Avenue A, New York, NY 10009, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJMcrE97VZwokR6_VTjbNC-MI"
  },
  {
    "id": 5,
    "name": "Rule of Thirds",
    "position": {
      "lat": 40.7247448,
      "lng": -73.9552327
    },
    "address": "171 Banker St, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJaQRXYuRZwokRHjAN5MkBizY"
  },
  {
    "id": 6,
    "name": "The Greats of Craft LIC",
    "position": {
      "lat": 40.7521825,
      "lng": -73.9480531
    },
    "address": "10-15 43rd Ave, Long Island City, NY 11101, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJL0xJb_ZZwokRfmKufMDAycE"
  },
  {
    "id": 7,
    "name": "Smør",
    "position": {
      "lat": 40.6826191,
      "lng": -73.96096039999999
    },
    "address": "26 Putnam Ave, Brooklyn, NY 11238, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJid6BdwBbwokRe3HVRa9K1VE"
  },
  {
    "id": 8,
    "name": "Lovely Day",
    "position": {
      "lat": 40.7217681,
      "lng": -73.9942796
    },
    "address": "196 Elizabeth St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJW5IvBIZZwokRVaV7E-M6m8M"
  },
  // {
  //   "id": 9,
  //   "name": "Brooklyn City Furniture",
  //   "position": {
  //     "lat": 40.728413,
  //     "lng": -73.9532375
  //   },
  //   "address": "820 Manhattan Ave, Brooklyn, NY 11222, USA",
  //   "beers": "Various craft beers",
  //   "placeId": "ChIJBfoN1EZZwokR3WqRiDf2T-c"
  // },
  {
    "id": 10,
    "name": "Beer Table",
    "position": {
      "lat": 40.75533765467295,
      "lng": -73.97084354572672
    },
    "address": "87 E 42nd St, New York, NY 10017, USA",
    "placeId": "ChIJGyXkmBxZwokRxObhoMjsqv0"
  },
  {
    "id": 11,
    "name": "yakuni",
    "position": {
      "lat": 40.7571743,
      "lng": -73.96838300000002
    },
    "address": "226 E 53rd St BSMT w, New York, NY 10022, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJN0u8egBZwokRCM2XbebokuQ"
  },
  // {
  //   "id": 12,
  //   "name": "Brooklyn Lantern",
  //   "position": {
  //     "lat": 40.737586,
  //     "lng": -73.95340399999999
  //   },
  //   "address": "77 Box St, Brooklyn, NY 11222, USA",
  //   "beers": "Various craft beers",
  //   "placeId": "ChIJT8KSiTtZwokRUPiMMtgMj-Y"
  // },
  {
    "id": 13,
    "name": "Hard to Explain",
    "position": {
      "lat": 40.72912609999999,
      "lng": -73.98560379999999
    },
    "address": "224 E 10th St, New York, NY 10003, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJZyhu1alZwokRDu4FC-wriY4"
  },
  {
    "id": 14,
    "name": "Velma Restaurant",
    "position": {
      "lat": 40.7042332,
      "lng": -73.9104028
    },
    "address": "584 Seneca Ave, Queens, NY 11385, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJl-QwDnxdwokRUoS7oTlwK0Q"
  },
  {
    "id": 15,
    "name": "icca",
    "position": {
      "lat": 40.7143008,
      "lng": -74.0076845
    },
    "address": "20 Warren St, New York, NY 10007, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJyRIhC_dbwokRqGoh89KPQME"
  },
  {
    "id": 16,
    "name": "As you like",
    "position": {
      "lat": 40.71659049999999,
      "lng": -73.9427596
    },
    "address": "428 Humboldt St, Brooklyn, NY 11211, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJCbecnoVZwokRiMxQmAt9pxk"
  },
  {
    "id": 17,
    "name": "DASHI OKUME Brooklyn",
    "position": {
      "lat": 40.7246839,
      "lng": -73.9536504
    },
    "address": "50 Norman Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJYe9rSINZwokRw_36I8jEHzM"
  },
  {
    "id": 18,
    "name": "Creston",
    "position": {
      "lat": 40.71794500000001,
      "lng": -73.99243299999999
    },
    "address": "282 Grand St, New York, NY 10002, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJxx06i8dZwokRMgAg7mEIwSw"
  },
  {
    "id": 19,
    "name": "Wasan Brooklyn",
    "position": {
      "lat": 40.6812952,
      "lng": -73.9768496
    },
    "address": "440 Bergen St, Brooklyn, NY 11217, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJBavgoa5bwokRmG1fmugGzlE"
  },
  {
    "id": 20,
    "name": "Bar Moga",
    "position": {
      "lat": 40.7278195,
      "lng": -74.0010896
    },
    "address": "128 W Houston St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJRy7Z-I1ZwokRQm17a6QDJ6E"
  },
  {
    "id": 21,
    "name": "The Izakaya NYC",
    "position": {
      "lat": 40.72671450000001,
      "lng": -73.98734
    },
    "address": "326 E 6th St, New York, NY 10003, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJKWfvx5xZwokRpeSAmKP10Sg"
  },
  {
    "id": 22,
    "name": "OKONOMI / YUJI Ramen Manhattan",
    "position": {
      "lat": 40.7442476,
      "lng": -73.9906333
    },
    "address": "36 W 26th St, New York, NY 10010, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJtSiEHwBZwokRvaIX7do3E7Y"
  },
  {
    "id": 23,
    "name": "TONCHIN NEW YORK",
    "position": {
      "lat": 40.7502712,
      "lng": -73.9845225
    },
    "address": "13 W 36th St., New York, NY 10018, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJBwGziqlZwokRb3MTH3xUt0Y"
  },
  {
    "id": 24,
    "name": "C as in Charlie",
    "position": {
      "lat": 40.7255039,
      "lng": -73.99270179999999
    },
    "address": "5 Bleecker St, New York, NY 10012, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJx-bMHr1ZwokRd3i_y7F3VlE"
  },
  {
    "id": 25,
    "name": "Secchu Yokota 折衷よこ田",
    "position": {
      "lat": 40.7228463,
      "lng": -73.9831229
    },
    "address": "199 E 3rd St, New York, NY 10009, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ8-YKf4JZwokR8E9EvXIGnhI"
  },
  {
    "id": 26,
    "name": "Beer Run UWS",
    "position": {
      "lat": 40.7867868,
      "lng": -73.9717038
    },
    "address": "547 Columbus Ave, New York, NY 10024, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ3S2hi5RZwokR62FzBraqmQ0"
  },
  {
    "id": 27,
    "name": "Susuru Ramen",
    "position": {
      "lat": 40.75567,
      "lng": -73.92734399999999
    },
    "address": "33-19 36th Ave, Long Island City, NY 11106, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJI24tFJtfwokRG-LlfsXYTDA"
  },
  {
    "id": 28,
    "name": "Sweet Avenue",
    "position": {
      "lat": 40.744124,
      "lng": -73.923926
    },
    "address": "40-05 Queens Blvd, Sunnyside, NY 11104, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJmbusst5fwokRG7J7eIN55AU"
  },
  {
    "id": 29,
    "name": "MOGMOG",
    "position": {
      "lat": 40.74233189999999,
      "lng": -73.9552533
    },
    "address": "5-35 51st Ave, Long Island City, NY 11101, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJP196UmFZwokR9HJCzWGczA4"
  },
  {
    "id": 30,
    "name": "Brouwerij Lane",
    "position": {
      "lat": 40.729628,
      "lng": -73.957911
    },
    "address": "78 Greenpoint Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJQVgaRkBZwokRXAw3-NTM6hw"
  },
  {
    "id": 31,
    "name": "A-un Brooklyn",
    "position": {
      "lat": 40.7041433,
      "lng": -73.9280254
    },
    "address": "156 Knickerbocker Ave, Brooklyn, NY 11237, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJF-b7DGRdwokRQ86k2XAopKk"
  },
  {
    "id": 32,
    "name": "Monarch Izakaya Restaurant",
    "position": {
      "lat": 40.7159106,
      "lng": -73.9622605
    },
    "address": "146 Metropolitan Ave, Brooklyn, NY 11249, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ6_M75OhZwokRiuRfFsoX7K8"
  },
  {
    "id": 33,
    "name": "TONCHIN BROOKLYN",
    "position": {
      "lat": 40.716755,
      "lng": -73.9616957
    },
    "address": "109 N 3rd St, Brooklyn, NY 11249, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJVQw7S69ZwokRxkRkuFLa494"
  },
  {
    "id": 34,
    "name": "Taku Sando",
    "position": {
      "lat": 40.72988,
      "lng": -73.95963569999999
    },
    "address": "29 Greenpoint Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ8ZshVyFZwokRqQFLjNmfWmE"
  },
  {
    "id": 35,
    "name": "SSAW Brooklyn",
    "position": {
      "lat": 40.7092207,
      "lng": -73.95397609999999
    },
    "address": "330 S 3rd St, Brooklyn, NY 11211, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJ3xYJKABbwokRjhgU1mfahJk"
  },
  {
    "id": 36,
    "name": "TØRST",
    "position": {
      "lat": 40.72341399999999,
      "lng": -73.9507986
    },
    "address": "615 Manhattan Ave, Brooklyn, NY 11222, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJlaFjTURZwokRvsN6V805OEk"
  },
  {
    "id": 37,
    "name": "Brooklyn Kura",
    "position": {
      "lat": 40.6578887,
      "lng": -74.0074793
    },
    "address": "34 34th St, Brooklyn, NY 11232, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJnxaggMBawokRt7fWu0tvGBY"
  },
  {
    "id": 38,
    "name": "Queue Beer",
    "position": {
      "lat": 40.6740637,
      "lng": -73.99825770000001
    },
    "address": "500 Smith St, Brooklyn, NY 11231, USA",
    "beers": "Various craft beers",
    "placeId": "ChIJHzJT8c9bwokRyBhYdoeZIE8"
  },
  {
    "id": 39,
    "name": "Coffee Table",
    "position": {
      "lat": 40.75546768875217,
      "lng": -73.97805332353686
    },
    "address": "107 E 42nd St, New York, NY 10017, USA",
    "placeId": "ChIJzcLzQtVZwokR9sn3GLG1aJw"
  },
  {
    "id": 41,
    "name": "The Lantern Inn",
    "position": {
      "lat": 41.80629948063366,
      "lng": -73.54754507316198
    },
    "address": "10 Main St, Wassaic, NY 12592, USA",
    "placeId": "ChIJH6rIA55k3YkRknH_IoV1fn4"
  },
  {
    "id": 42,
    "name": "Jō",
    "position": {
      "lat": 40.74927454661329,
      "lng": -73.98107069916597
    },
    "address": "127 E 34th St, New York, NY 10016, USA",
    "placeId": "ChIJ0wqA3DVZwokRw9mv_CYa8XQ"
  },
  {
    "id": 40,
    "name": "Beer Table Penn Station",
    "position": {
      "lat": 40.75403729989236,
      "lng": -73.99367450879208
    },
    "address": "1 Pennsylvania Plaza LIRR Concourse #115, New York, NY 10119, USA",
    "placeId": "ChIJFya9D-pZwokRAqPOcznC7P4"
  },
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

// Create SVG data URL from React icon components
const createSVGMarkerIcon = (IconComponent, color = '#4F46E5', size = 32) => {
  // Create SVG string with the icon
  const svgString = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        ${IconComponent}
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
};

// Define multiple marker icon options
const MARKER_ICONS = {
  classic: {
    svg: `<path fill="${'#4F46E5'}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#4F46E5' // Indigo
  },
  modern: {
    svg: `<path fill="${'#DC2626'}" d="M12 2C8.14 2 5 5.14 5 9c0 7 7 13 7 13s7-6 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#DC2626' // Red
  },
  elegant: {
    svg: `<path fill="${'#7C3AED'}" d="M12 2C8.14 2 5 5.14 5 9c0 7 7 13 7 13s7-6 7-13c0-3.86-3.14-7-7-7z"/><circle fill="white" cx="12" cy="9" r="2"/>`,
    color: '#7C3AED' // Purple
  },
  minimal: {
    svg: `<circle fill="${'#059669'}" cx="12" cy="12" r="8"/><circle fill="white" cx="12" cy="12" r="3"/>`,
    color: '#059669' // Emerald
  },
  brewery: {
    svg: `<path fill="${'#000000'}" d="M12 2C8.14 2 5 5.14 5 9c0 5.5 6.5 12.5 7 13c0.5-0.5 7-7.5 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`,
    color: '#000000' // Black color - Classic shape with sharper point
  }
};

// Create the marker icon with the selected style
const createMarkerIcon = (style = 'classic', size = 32, isActive = false) => {
  const iconData = MARKER_ICONS[style];
  const scale = isActive ? 1.2 : 1;
  const opacity = isActive ? 0.9 : 1;

  const svgString = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .pin-static {
            transform: scale(${scale});
            opacity: ${opacity};
            transform-origin: center bottom;
            transition: transform 0.2s ease-out, opacity 0.2s ease-out;
          }
          .pin-click {
            animation: clickBounce 0.3s ease-out;
            transform-origin: center bottom;
          }
          @keyframes clickBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1.1); }
          }
        </style>
      </defs>
      <g class="pin-static">
        ${iconData.svg}
      </g>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`,
    scaledSize: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(size, size) : undefined,
    anchor: typeof window !== 'undefined' && window.google ? new window.google.maps.Point(size / 2, size) : undefined,
  };
};

export default function MapDisplay() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [markerIcons, setMarkerIcons] = useState({ default: null, active: null });
  const [markersData, setMarkersData] = useState(initialMarkersData);
  const [clickedMarkerId, setClickedMarkerId] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
    version: "beta"
  });

  // Load location data from local storage on component mount
  useEffect(() => {
    const savedData = loadLocationData();
    if (savedData && savedData.locations && savedData.locations.length > 0) {
      console.log(`Loading ${savedData.locations.length} locations from saved data`);
      setMarkersData(savedData.locations);
    }
  }, []);

  // Pre-generate high-quality SVG marker icons when component mounts
  useEffect(() => {
    if (isLoaded) {
      // Create high-quality SVG icons - you can easily switch between styles
      const iconStyle = 'brewery'; // Change this to: 'classic', 'modern', 'elegant', 'minimal', or 'brewery'
      const iconSize = 36; // Back to original size

      setMarkerIcons({
        default: createMarkerIcon(iconStyle, iconSize, false),
        active: createMarkerIcon(iconStyle, iconSize, true)
      });
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
    // Trigger click animation
    setClickedMarkerId(markerData.id);
    setTimeout(() => setClickedMarkerId(null), 300); // Reset after animation

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
        {markersData.map((marker, index) => {
          return (
            <MarkerF
              key={`marker-${marker.id}-${marker.name}-${index}`}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
              icon={
                activeMarker && activeMarker.id === marker.id
                  ? markerIcons.active
                  : markerIcons.default
              }
              title={`${marker.name} (ID: ${marker.id})`}
              zIndex={
                activeMarker && activeMarker.id === marker.id
                  ? 2000 + index
                  : 1000 + index
              }
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