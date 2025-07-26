"use client";

import React from 'react';
import MapDisplay from '@/components/MapDisplay'; 

// Metadata has been moved to client/src/app/find-us/layout.js

export default function FindUsPage() {
  return (
    <main className="bg-off-white">
      <div className="w-full h-[93vh]"> {/* 93% viewport height container */}
        <MapDisplay />
      </div>

        {/* Placeholder for restaurant list/details if needed below or beside the map */}
        {/* 
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "The Crafty Pint", address: "123 Beer St, Anytown", beers: "Street Haze IPA, Salty Siren Lager" },
            { name: "Hop Heaven Bar", address: "456 Ale Ave, Anytown", beers: "Urban Nectar Pale Ale" },
            { name: "The Local Pour", address: "789 Brew Blvd, Anytown", beers: "All our core range" },
          ].map(spot => (
            <div key={spot.name} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{spot.address}</p>
              <p className="text-sm text-gray-500">Carries: {spot.beers}</p>
            </div>
          ))
        </div>
        */}
    </main>
  );
} 