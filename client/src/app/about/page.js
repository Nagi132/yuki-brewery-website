"use client";

import React, { useState } from 'react';
import TVWall from '@/components/TVWall';
import '../../styles/tv-effects.css'; // Make sure path is correct

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Content for the TV screens specific to the About page
  const aboutScreensContent = [
    // Top row - 4 screens
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
      id: 'history',
      title: 'OUR HISTORY',
      image: '/images/event.webp', 
      content: 'Our commitment to the community extends beyond our taproom.'
    },
    
    // Bottom row - 3 screens
    {
      id: 'process',
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
      id: 'future',
      title: 'OUR FUTURE',
      image: '/images/11.jpg', 
      content: 'We believe in creating beers that bring people together.'
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-900">
      <h1 className="sr-only">About Saltfields Brewing</h1>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-center text-white">
            <div className="inline-block w-10 h-10 border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-3">Loading TV experience...</p>
          </div>
        </div>
      )}
      
      {/* TV Wall component */}
      <TVWall 
        customScreens={aboutScreensContent} 
        onInitialized={() => setIsLoading(false)}
      />
    </main>
  );
}