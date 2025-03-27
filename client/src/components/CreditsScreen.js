import React from 'react';
import { motion } from 'framer-motion';

// Special component just for the credits screen to match your reference image
export default function CreditsScreen({ isFocused, onFocus }) {
  return (
    <div className="tv-screen-container mx-auto z-10">
      <motion.div 
        className={`tv-unit relative ${isFocused ? 'scale-105' : ''}`}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        {/* TV Frame - more rounded/pillow-shaped border */}
        <div className="tv-frame" style={{ 
          borderRadius: '40% / 30%',
          border: '3px solid rgba(255,255,255,0.7)',
          boxShadow: '0 0 15px rgba(0,0,0,0.5)'
        }}>
          {/* Screen with white background and centered text */}
          <div 
            className="tv-screen relative overflow-hidden cursor-pointer"
            style={{ borderRadius: '35% / 25%', aspectRatio: '4/3' }}
            onClick={() => onFocus()}
          >
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6">
              <h1 className="text-2xl md:text-3xl font-black text-black mb-4">
                SALTFIELDS BREWING
              </h1>
              <p className="text-lg text-black">by Yumi & Yuki</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}