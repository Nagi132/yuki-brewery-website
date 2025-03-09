"use client";

import React from 'react';
import Image from 'next/image';

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-off-white relative">

      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-8 mt-8">
          <h1 className="text-4xl font-normal tracking-wide text-zinc-900 text-center mb-4">ABOUT</h1>
          <p className="text-zinc-700 text-lg text-center max-w-2xl mx-auto mb-16">
            From street culture to craft beer, our journey of bringing together two worlds.
          </p>
        </div>

        {/* Story Sections */}
        <div className="space-y-24 pb-24">
          {/* Section 1 */}
          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src="/images/1.jpg"
                  alt="Saltfields brewing process"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold tracking-wide text-zinc-900 mb-6">
                  WHERE IT ALL BEGAN
                </h2>
                <div className="space-y-4 text-zinc-700">
                  <p>
                    Born from the intersection of skateboarding and craft beer culture, Saltfields started as a simple idea in 2020. We wanted to create a space where the energy of street culture meets the craftsmanship of brewing.
                  </p>
                  <p>
                    Our founder, drawing from years of experience in both worlds, saw an opportunity to bridge these communities. The name "Saltfields" comes from the salt-stained streets of New York City winters - where skaters would brave the elements, much like our commitment to brewing in any condition.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:pr-12 order-2 lg:order-1">
                <h2 className="text-2xl font-bold tracking-wide text-zinc-900 mb-6">
                  CRAFTING OUR IDENTITY
                </h2>
                <div className="space-y-4 text-zinc-700">
                  <p>
                    Every can we produce is a canvas, featuring collaborations with local artists and skaters. Our designs reflect the raw energy of street culture while our brewing process honors traditional craftsmanship.
                  </p>
                  <p>
                    We believe in creating beers that bring people together, whether you're fresh off a skating session or just appreciate quality craft beer. Each recipe is developed with the same attention to detail that goes into perfecting a new trick.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden order-1 lg:order-2">
                <Image
                  src="/images/2.jpg"
                  alt="Saltfields can designs"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="Saltfields community"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold tracking-wide text-zinc-900 mb-6">
                  COMMUNITY FIRST
                </h2>
                <div className="space-y-4 text-zinc-700">
                  <p>
                    Today, Saltfields is more than just a brewery. It's a hub for creatives, skaters, and beer enthusiasts alike. We host events that celebrate both cultures, from art shows to video premieres, always accompanied by our latest brews.
                  </p>
                  <p>
                    Our commitment to the community extends beyond our taproom. We actively support local skate initiatives and collaborate with artists from the scene, ensuring that every aspect of our brand gives back to the culture that inspired us.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}