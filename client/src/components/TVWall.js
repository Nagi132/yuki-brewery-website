"use client";

import React, { useState, useEffect } from 'react';
import TVScreen from './TVScreen';
import CreditsScreen from './CreditsScreen';

export default function TVWall({ customScreens, onInitialized }) {
  const [activeScreen, setActiveScreen] = useState(null);
  const [poweredScreens, setPoweredScreens] = useState({});
  const [showStatic, setShowStatic] = useState({});
  const [initialized, setInitialized] = useState(false);

  // Default TV content data
  const defaultTvScreens = [
    {
      id: 'beer-selection',
      title: 'OUR SELECTION',
      image: '/images/1.jpg',
      content: 'Carefully crafted small-batch beers with unique flavor profiles.'
    },
    {
      id: 'brand',
      title: 'SALTFIELDS',
      image: '/images/2.jpg',
      content: 'CRAFT BEER MEETS STREET CULTURE'
    },
    {
      id: 'community',
      title: 'COMMUNITY FIRST',
      image: '/images/3.jpg', 
      content: 'Today, Saltfields is more than just a brewery. It\'s a hub for creatives, skaters, and beer enthusiasts alike.'
    },
    {
      id: 'events',
      title: 'OUR HISTORY',
      image: '/images/event.webp', 
      content: 'Our commitment to the community extends beyond our taproom.'
    },
    {
      id: 'product-orange',
      title: 'OUR PROCESS',
      image: '/images/10.jpg', 
      content: 'Every can we produce is a canvas, featuring collaborations with local artists and skaters.'
    },
    {
      id: 'saltfields-credit',
      title: 'SALTFIELDS BREWING',
      isSpecial: true,
      content: 'by Yumi & Yuki'
    },
    {
      id: 'product-blue',
      title: 'OUR FUTURE',
      image: '/images/11.jpg', 
      content: 'We believe in creating beers that bring people together.'
    }
  ];

  // Use custom screens if provided, otherwise use default
  const tvScreens = customScreens || defaultTvScreens;

  // Initialize with screens turned on sequentially
  useEffect(() => {
    if (!initialized) {
      const initialPoweredState = {};
      const initialStaticState = {};
      
      // Start with all screens off
      tvScreens.forEach(screen => {
        initialPoweredState[screen.id] = false;
        initialStaticState[screen.id] = false;
      });
      
      setPoweredScreens(initialPoweredState);
      setShowStatic(initialStaticState);
      
      // Power on screens one by one with delay
      let delay = 0;
      let screensOn = 0;
      
      tvScreens.forEach((screen) => {
        setTimeout(() => {
          setPoweredScreens(prev => ({
            ...prev,
            [screen.id]: true
          }));
          
          // Show static briefly when turning on
          setShowStatic(prev => ({
            ...prev,
            [screen.id]: true
          }));
          
          // Hide static after a moment
          setTimeout(() => {
            setShowStatic(prev => ({
              ...prev,
              [screen.id]: false
            }));
            
            // Count screens that are fully initialized
            screensOn++;
            
            // If all screens are initialized, notify parent
            if (screensOn === tvScreens.length && onInitialized) {
              setTimeout(() => {
                onInitialized();
              }, 500);  // Small delay to ensure everything is rendered
            }
          }, 1000);
        }, delay);
        delay += 800; // Stagger the power-on sequence
      });
      
      setInitialized(true);
    }
  }, [initialized, tvScreens, onInitialized]);

  // Set focus on a screen
  const focusScreen = (screenId) => {
    if (poweredScreens[screenId] && !showStatic[screenId]) {
      setActiveScreen(activeScreen === screenId ? null : screenId);
    }
  };

  return (
    <div className="relative tv-wall w-full h-screen flex flex-col justify-center items-center">
      {/* Simple approach with a div that has a background color as fallback */}
      <div className="absolute inset-0 -z-10 bg-zinc-800"></div>
      
      {/* Custom CSS approach for the background */}
      <style jsx>{`
        .tv-wall::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url(/images/aboutbg.jpg);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 1;
        }
      `}</style>
      
      {/* TV screens in a more spread-out layout */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-8">
        {/* Top row - 4 TVs spread across */}
        <div className="w-full flex justify-between mb-20 px-8">
          {tvScreens.slice(0, 4).map((screen, index) => (
            <div key={screen.id} style={{ 
              width: '22%', 
              transform: index % 2 ? 'translateY(-10px)' : 'translateY(10px)' // Slight vertical offset for natural look
            }}>
              <TVScreen
                screen={screen}
                isPowered={poweredScreens[screen.id]}
                isStatic={showStatic[screen.id]}
                isFocused={activeScreen === screen.id}
                onFocus={() => focusScreen(screen.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Bottom row - 3 TVs in the bottom half */}
        <div className="w-4/5 flex justify-between px-12">
          {/* First screen in bottom row */}
          <div style={{ width: '28%' }}>
            <TVScreen
              screen={tvScreens[4]}
              isPowered={poweredScreens[tvScreens[4].id]}
              isStatic={showStatic[tvScreens[4].id]}
              isFocused={activeScreen === tvScreens[4].id}
              onFocus={() => focusScreen(tvScreens[4].id)}
            />
          </div>
          
          {/* Middle screen - Special credits screen */}
          <div style={{ width: '28%', transform: 'translateY(-7px)' }}>
            {/* Use dedicated CreditsScreen component for middle bottom TV */}
            <CreditsScreen
              isFocused={activeScreen === tvScreens[5].id}
              onFocus={() => focusScreen(tvScreens[5].id)}
            />
          </div>
          
          {/* Third screen in bottom row */}
          <div style={{ width: '28%' }}>
            <TVScreen
              screen={tvScreens[6]}
              isPowered={poweredScreens[tvScreens[6].id]}
              isStatic={showStatic[tvScreens[6].id]}
              isFocused={activeScreen === tvScreens[6].id}
              onFocus={() => focusScreen(tvScreens[6].id)}
            />
          </div>
        </div>
        
        {/* Silhouettes of people looking at TVs */}
        <div className="absolute bottom-4 left-20 hidden md:block">
          <div className="w-12 h-48 bg-black opacity-50" style={{ clipPath: 'polygon(30% 0, 70% 0, 70% 85%, 100% 100%, 0 100%, 30% 85%)' }}></div>
        </div>
        <div className="absolute bottom-4 right-20 hidden md:block">
          <div className="w-10 h-40 bg-black opacity-50" style={{ clipPath: 'polygon(20% 0, 80% 0, 90% 85%, 100% 100%, 0 100%, 10% 85%)' }}></div>
        </div>
      </div>
    </div>
  );
}