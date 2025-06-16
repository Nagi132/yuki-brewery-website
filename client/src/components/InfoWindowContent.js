import React, { useState } from 'react';
import Image from 'next/image';

const StarIcon = ({ filled, className = "w-3.5 h-3.5" }) => (
  <svg className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CloseButton = ({ onClose, hasPhoto }) => (
  <button
    onClick={onClose}
    className={`absolute top-2 right-2 ${
      hasPhoto 
        ? 'bg-black bg-opacity-60 hover:bg-opacity-80' 
        : 'bg-gray-500 bg-opacity-50 hover:bg-opacity-70'
    } rounded-full w-7 h-7 flex items-center justify-center transition-all duration-150 z-10`}
    aria-label="Close"
  >
    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

const BusinessStatus = ({ isOpen, businessStatus }) => {
  if (businessStatus === 'OPERATIONAL' && typeof isOpen === 'boolean') {
    return (
      <div className="flex items-center">
        {isOpen ? (
          <svg className="w-3.5 h-3.5 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
        <span className={`text-xs font-medium ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
          {isOpen ? 'Open now' : 'Currently closed'}
        </span>
      </div>
    );
  }

  if (businessStatus && businessStatus !== 'OPERATIONAL') {
    return (
      <div className="flex items-center">
        <svg className="w-3.5 h-3.5 text-orange-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span className="text-xs font-medium text-orange-700">
          {businessStatus.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
    );
  }

  return null;
};

const InfoImage = ({ photoUrl, name, onImageLoad }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    onImageLoad && onImageLoad();
  };

  const handleImageError = () => {
    console.warn(`Failed to load image: ${photoUrl}`);
    setImageLoading(false);
    onImageLoad && onImageLoad();
  };

  return (
    <div className="relative w-full h-40 bg-gray-200">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-lg"></div>
      )}
      <Image
        src={photoUrl}
        alt={name}
        fill
        sizes="280px"
        unoptimized
        className={`object-cover rounded-t-lg transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default function InfoWindowContent({ activeMarker, onClose, onImageLoad }) {
  const displayName = activeMarker.fetchedName || activeMarker.name;

  return (
    <div className="w-max max-w-[280px] sm:max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
      {activeMarker.photoUrl && (
        <>
          <InfoImage 
            photoUrl={activeMarker.photoUrl} 
            name={displayName}
            onImageLoad={onImageLoad}
          />
          <CloseButton onClose={onClose} hasPhoto={true} />
        </>
      )}
      
      {!activeMarker.photoUrl && (
        <div className="relative h-8">
          <CloseButton onClose={onClose} hasPhoto={false} />
        </div>
      )}

      <div className={`p-3 space-y-1.5 ${!activeMarker.photoUrl ? 'pt-0' : ''}`}>
        <h4 className="text-base font-semibold text-gray-900 truncate" title={displayName}>
          {displayName}
        </h4>
        <p className="text-xs text-gray-600 truncate" title={activeMarker.address}>
          {activeMarker.address}
        </p>

        {activeMarker.rating !== undefined && activeMarker.rating !== null && (
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(activeMarker.rating)} />
            ))}
            <span className="ml-1.5 text-xs text-gray-500">
              {activeMarker.rating.toFixed(1)}
            </span>
          </div>
        )}

        <BusinessStatus 
          isOpen={activeMarker.isOpen} 
          businessStatus={activeMarker.businessStatus} 
        />

        <p className="text-xs text-gray-500 italic truncate" title={activeMarker.beers}>
          {activeMarker.beers}
        </p>

        <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2.5 -mt-px">
          <div className="flex-1">
            {activeMarker.website && (
              <a 
                href={activeMarker.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-500 hover:underline transition-colors"
              >
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
  );
}