import React, { useState } from 'react';
import SimpleSizeChart from './SimpleSizeChart';

const SizeChartButton = ({ product, label = "Size Chart", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`text-zinc-600 hover:text-black text-sm underline ${className}`}
        aria-label="View size chart"
      >
        {label}
      </button>
      
      {/* Size Chart Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <SimpleSizeChart product={product} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default SizeChartButton;