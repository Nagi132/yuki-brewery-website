// client/src/app/events/page.js
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-off-white relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0),
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 mt-8">
            <h1 className="text-4xl font-normal tracking-wide text-zinc-900 mb-4">UPCOMING EVENTS</h1>
            <p className="text-zinc-700 max-w-2xl mx-auto text-lg">
              Join us for special releases, tastings, and community gatherings.
            </p>
          </div>

          {/* Featured Event Flyer */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-sm p-4shadow-sm border border-black/5 overflow-hidden">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/event.webp"
                  alt="Saltfields Summer Brew Festival"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-sm p-8 border border-black/5">
            <h2 className="text-2xl font-bold tracking-wide text-zinc-900 mb-6">
              SUMMER BREW FESTIVAL
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <FaCalendarAlt className="text-amber-500 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-zinc-900">DATE</p>
                  <p className="text-zinc-700">SATURDAY, JUNE 15, 2025</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaClock className="text-amber-500 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-zinc-900">TIME</p>
                  <p className="text-zinc-700">12:00 PM - 8:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-amber-500 mt-1 mr-4" />
                <div>
                  <p className="font-medium text-zinc-900">LOCATION</p>
                  <p className="text-zinc-700">SALTFIELDS BREWING</p>
                  <p className="text-zinc-700">123 ABC STREET, NEW YORK, NY 12345</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-zinc-700">
              <p>
                Join us for our annual Summer Brew Festival celebrating the release of our seasonal brews. This year features our new Street Haze Summer IPA and limited edition collaborations with local artists.
              </p>
              <p>
                The event includes tastings of all our signature beers, food from local vendors, live music, and exclusive merchandise drops. Skate demonstrations will be happening throughout the day at our custom-built mini ramp.
              </p>
              <p>
                Tickets include entry, a commemorative tasting glass, and four 5oz pours. Additional tasting tokens available for purchase. This is a 21+ event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}