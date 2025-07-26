// client/src/app/events/page.js
// "use client"; // This directive is removed to make it a Server Component.

import React from 'react';
// Removed Image and Link as they are now handled by ScrollableEventList for past events
import { getUpcomingEvent, getPastEvents } from '@/lib/shopify'; // Adjust path if needed
// import ScrollableEventList from '@/components/ScrollableEventList'; // No longer needed
import EventCarousel3D from '@/components/EventCarousel3D'; // Import the new 3D carousel component
import Image from 'next/image'; // Keep for upcoming event
import Link from 'next/link'; // Keep for potential future use or if upcoming becomes a link

export const metadata = {
  title: 'Events - Saltfields Brewing',
  description: 'Join Saltfields Brewing at our upcoming events. Check out past event highlights and see what\'s new.',
  openGraph: {
    title: 'Events at Saltfields Brewing',
    description: 'Stay updated with the latest events, tastings, and gatherings from Saltfields Brewing.',
    url: 'https://saltfieldsbrewing.com/events',
  },
};

// Convert to an async server component
export default async function EventsPage() {
  // Fetch upcoming and past events in parallel
  const [upcomingEvent, pastEvents] = await Promise.all([
    getUpcomingEvent('events'), // Use your actual blog handle
    getPastEvents('events', { limit: 10 }) // Keep fetching a decent number for the carousel
  ]);

  if (!upcomingEvent) {
    // If no upcoming event, you might still want to show past events or a different message
    return (
      <main className="min-h-screen bg-off-white relative py-16 px-4 flex flex-col items-center">
        <div className="text-center mb-12 w-full max-w-6xl">
          <h1 className="text-2xl font-normal tracking-wide mb-4">EVENTS</h1>
          <p className="text-zinc-700 text-xs">
            No upcoming events at the moment. Sign up to our newsletter to stay up to date!
          </p>
        </div>
        {/* Display past events even if no upcoming event is found */}
        {pastEvents && pastEvents.length > 0 && (
          <div className="w-full max-w-6xl pt-12 mt-12 border-t border-zinc-200">
            <div className="text-center mb-12">
              <h1 className="text-2xl font-normal tracking-wide">PAST EVENTS</h1>
            </div>
            <EventCarousel3D events={pastEvents} />
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-off-white relative">
      <div className="relative py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header for Upcoming Event */}
          <div className="text-center mb-12 mt-8">
            <h1 className="text-2xl font-normal tracking-wide mb-4">UPCOMING EVENT</h1>
          </div>

          {/* Upcoming Event Section */}
          <div className="mb-16">
            <div className="flex flex-col items-center justify-center">
              <div className="relative aspect-[5/4] w-full max-w-2xl overflow-hidden shadow-xl">
                <Image
                  src={upcomingEvent.imageUrl}
                  alt={upcomingEvent.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div 
                className="space-y-4 text-zinc-700 prose lg:prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: upcomingEvent.descriptionHtml }}
              />
              <div> 
                <h2 className="text-2xl font-semibold tracking-wide text-zinc-900 mb-6">
                  {upcomingEvent.title}
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium text-zinc-900">DATE</p>
                      <p className="text-zinc-700">{upcomingEvent.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium text-zinc-900">TIME</p>
                      <p className="text-zinc-700">{upcomingEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div>
                      <p className="font-medium text-zinc-900">LOCATION</p>
                      <p className="text-zinc-700">{upcomingEvent.locationName}</p>
                      {upcomingEvent.locationAddress && (
                        <p className="text-zinc-700">{upcomingEvent.locationAddress}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Events Section */}
          {pastEvents && pastEvents.length > 0 && (
            <div className="pt-16 border-t border-zinc-200">
              <div className="text-center mb-12">
                <h1 className="text-2xl font-normal tracking-wide">PAST EVENTS</h1>
              </div>
              <EventCarousel3D events={pastEvents} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}