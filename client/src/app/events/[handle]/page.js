import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { getEventByHandle, getPastEvents } from '@/lib/shopify';
import { notFound } from 'next/navigation'; // For handling 404
import EventCarousel3D from '@/components/EventCarousel3D'; // Import the carousel

// This function can also be used to generate static paths if desired, but not strictly necessary for dynamic rendering.
// export async function generateStaticParams() {
//   // Optionally, fetch all event handles to pre-render pages at build time
//   // For now, we'll keep it dynamic
//   return [];
// }

export default async function SingleEventPage({ params }) {
    // Explicitly "await" params.handle, even though it's not a typical promise.
    // This is a pattern to try and satisfy Next.js's resolver for dynamic params in Server Components.
    const awaitedParams = await params;
    const handle = awaitedParams.handle;

    const event = await getEventByHandle(handle);

    if (!event) {
        notFound();
    }

    // Fetch more events for the carousel, e.g., 6-7 total to have a good selection after filtering
    const otherEventsRaw = await getPastEvents('events', { limit: 7 });

    // Filter out the current event and ensure we have enough for a carousel
    const otherEvents = otherEventsRaw.filter(e => e.slug !== handle).slice(0, 6); // Keep up to 6 other events

    return (
        <main className="min-h-screen bg-off-white relative">
            <div className="relative pt-8 pb-16 px-4">
                {/* Go Back Link */}
                <div className="container mx-auto max-w-6xl mb-8">
                    <Link href="/events" className="flex items-center text-zinc-600 hover:text-zinc-800 transition-colors">
                        <FaArrowLeft className="mr-2" size={14} />
                        Upcoming Event
                    </Link>
                </div>

                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12 mt-4">
                        <h1 className="text-3xl font-normal tracking-wide text-zinc-900 mb-4">{event.title}</h1>
                    </div>

                    {event.imageUrl && event.imageUrl !== '/images/placeholder.jpg' && (
                        <div className="flex flex-col items-center justify-center mb-16">
                            <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.imageAlt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {event.descriptionHtml && (
                            <div
                                className="space-y-4 text-zinc-700 prose lg:prose-lg max-w-none mb-8"
                                dangerouslySetInnerHTML={{ __html: event.descriptionHtml }}
                            />
                        )}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <div>
                                    <p className="font-medium text-zinc-900">DATE</p>
                                    <p className="text-zinc-700">{event.date}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div>
                                    <p className="font-medium text-zinc-900">TIME</p>
                                    <p className="text-zinc-700">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div>
                                    <p className="font-medium text-zinc-900">LOCATION</p>
                                    <p className="text-zinc-700">{event.locationName}</p>
                                    {event.locationAddress && (
                                        <p className="text-zinc-700">{event.locationAddress}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* More Events Section using Carousel */}
                    {otherEvents && otherEvents.length > 0 && (
                        <div className="pt-16 mt-16 border-t border-zinc-200">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl font-normal tracking-wide text-zinc-900">MORE EVENTS</h1>
                            </div>
                            <EventCarousel3D events={otherEvents} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
} 