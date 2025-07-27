// client/src/components/RestaurantList.js
"use client";

import React, { useState, useMemo } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Function to determine borough from address
const getBoroughFromAddress = (address) => {
  if (address.includes('Brooklyn, NY')) return 'Brooklyn';
  if (address.includes('Long Island City, NY') || address.includes('Sunnyside, NY') || address.includes('Queens, NY') || address.includes('Ridgewood, NY')) return 'Queens';
  if (address.includes('New York, NY')) return 'Manhattan';
  if (address.includes('Bronx, NY')) return 'Bronx';
  if (address.includes('Staten Island, NY')) return 'Staten Island';
  return 'Other';
};

export default function RestaurantList({ 
  restaurants = [], 
  onRestaurantHover, 
  onRestaurantClick,
  onRestaurantLeave,
  activeRestaurant = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedBoroughs, setCollapsedBoroughs] = useState(new Set());

  // Group restaurants by borough and filter by search
  const groupedRestaurants = useMemo(() => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped = filtered.reduce((acc, restaurant) => {
      const borough = getBoroughFromAddress(restaurant.address);
      if (!acc[borough]) acc[borough] = [];
      acc[borough].push(restaurant);
      return acc;
    }, {});

    // Sort boroughs by count (largest first)
    const sortedBoroughs = Object.keys(grouped).sort((a, b) => 
      grouped[b].length - grouped[a].length
    );

    return sortedBoroughs.map(borough => ({
      borough,
      restaurants: grouped[borough].sort((a, b) => a.name.localeCompare(b.name))
    }));
  }, [restaurants, searchTerm]);

  const totalFilteredCount = groupedRestaurants.reduce((sum, group) => sum + group.restaurants.length, 0);

  const toggleBorough = (borough) => {
    const newCollapsed = new Set(collapsedBoroughs);
    if (newCollapsed.has(borough)) {
      newCollapsed.delete(borough);
    } else {
      newCollapsed.add(borough);
    }
    setCollapsedBoroughs(newCollapsed);
  };

  return (
    <div className="w-full lg:w-80 h-full bg-white shadow-lg border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-2 lg:mb-3">
          Find Saltfields Beer
        </h2>
        
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 lg:w-4 lg:h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search restaurants..."
            className="w-full pl-9 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 text-xs lg:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
          />
        </div>
        
        {/* Results counter */}
        <div className="mt-1.5 lg:mt-2 text-xs text-gray-500">
          {totalFilteredCount} of {restaurants.length} locations
        </div>
      </div>

      {/* Restaurant List by Borough */}
      <div className="flex-1 overflow-y-auto">
        {groupedRestaurants.map(({ borough, restaurants: boroughRestaurants }) => (
          <div key={borough} className="border-b border-gray-100 last:border-b-0">
            {/* Borough Header */}
            <button
              onClick={() => toggleBorough(borough)}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-100 flex items-center justify-between text-left border-b border-gray-200"
            >
              <div>
                <h3 className="font-medium text-gray-800 text-xs lg:text-sm">{borough}</h3>
                <p className="text-xs text-gray-500">{boroughRestaurants.length} locations</p>
              </div>
              {collapsedBoroughs.has(borough) ? 
                <FaChevronDown className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400" /> : 
                <FaChevronUp className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-gray-400" />
              }
            </button>

            {/* Restaurant List for Borough */}
            {!collapsedBoroughs.has(borough) && (
              <div>
                {boroughRestaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    className={`p-3 lg:p-4 cursor-pointer transition-all duration-100 ease-out hover:bg-blue-50 hover:border-l-4 hover:border-l-blue-500 hover:pl-5 lg:hover:pl-6 ${
                      activeRestaurant?.id === restaurant.id 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500 pl-5 lg:pl-6' 
                        : ''
                    } ${index > 0 ? 'border-t border-gray-50' : ''}`}
                    onMouseEnter={() => onRestaurantHover?.(restaurant)}
                    onMouseLeave={() => onRestaurantLeave?.(restaurant)}
                    onClick={() => onRestaurantClick?.(restaurant)}
                    onTouchStart={() => onRestaurantHover?.(restaurant)}
                  >
                    {/* Restaurant Name */}
                    <h3 className="font-medium text-gray-900 text-xs lg:text-sm mb-1 leading-tight">
                      {restaurant.name}
                    </h3>
                    
                    {/* Address */}
                    <div className="flex items-start text-xs text-gray-600 mb-1.5 lg:mb-2">
                      <FaMapMarkerAlt className="w-2.5 h-2.5 lg:w-3 lg:h-3 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight">{restaurant.address}</span>
                    </div>
                    
                    {/* Beer Info */}
                    {restaurant.beers && (
                      <div className="text-xs text-gray-500 italic">
                        {restaurant.beers}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* No results message */}
        {totalFilteredCount === 0 && searchTerm && (
          <div className="p-6 lg:p-8 text-center text-gray-500">
            <FaSearch className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs lg:text-sm">No restaurants found</p>
            <p className="text-xs">Try a different search term</p>
          </div>
        )}
      </div>

    </div>
  );
}