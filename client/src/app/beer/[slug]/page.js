"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Sample beer catalog data - in a real app, this would come from an API
const beerCatalog = {
  'rice-lager': {
    name: "SALTFIELDS RICE LAGER",
    subtitle: "\"NODOGOSHI\" Supremely Dry and Delicious",
    specs: "1 Pint • 4.7% ALC/VOL",
    description: [
      "Crisp, dry, and endlessly refreshing, this Japanese-inspired Rice Lager brings together tradition and innovation in every sip. Brewed with a base of German Pilsner malt, a blend of flaked rice and whole grain Calrose rice, and a touch of white Koji, this beer develops a delicate acidity that enhances its clean, snappy finish.",
      "We brew with Calrose rice, a grain first carried to American soil by Japanese hands, then lovingly refined over time. We, too, are travelers from Japan, drawn across the ocean by hope and purpose. In reverence to that journey, we chose this rice as the heart of our very first beer, a quiet tribute to our heritage and roots.",
      "Noble hops Perle, Hallertau, and Tettnang provide a soft floral and spicy balance, while 34/70 German lager yeast ensures a crisp fermentation with high attenuation. The result is a brilliantly bright, supremely crushable lager beer.",
      "Best enjoyed ice cold, this beer is perfect for hot beach days, late-night Izakaya sessions, and pairing with fresh seafood or crispy Karaage (Japanese fried chicken)."
    ],
    images: [
      "/images/Saltfields_Brewing_Can_Front.webp",
      "/images/Saltfields_Brewing_Can_Right.webp", 
      "/images/Saltfields_Brewing_Can_Left.webp"
    ],
    relatedBeers: ['hazy-ipa', 'pilsner']
  },
};

export default function BeerDetailPage({ params }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [beer, setBeer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    // For this demo, we use the static catalog above
    const slug = params?.slug || 'rice-lager';
    const beerData = beerCatalog[slug];
    
    if (beerData) {
      setBeer(beerData);
    }
    
    setIsLoading(false);
  }, [params]);
  
  const nextImage = () => {
    if (!beer) return;
    setCurrentImageIndex((prev) => 
      prev === beer.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    if (!beer) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? beer.images.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-amber-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!beer) {
    return (
      <div className="min-h-screen bg-off-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-4">Beer Not Found</h1>
          <p className="mb-8">The beer you're looking for doesn't seem to exist.</p>
          <Link href="/beer" className="inline-block bg-black text-white px-6 py-3 font-medium">
            View All Beers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-off-white py-16 mt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Beer Image with Navigation */}
          <div className="relative">
            <div className="relative aspect-[3/4] bg-white">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={beer.images[currentImageIndex]}
                  alt={beer.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </motion.div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white p-2 rounded-full"
                aria-label="Next image"
              >
                <FaArrowRight />
              </button>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {beer.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === idx ? 'bg-black' : 'bg-gray-300'}`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Beer Description */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{beer.name}</h1>
              <h2 className="text-xl text-amber-600 mt-1">{beer.subtitle}</h2>
              <p className="text-lg mt-2">{beer.specs}</p>
            </div>
            
            <div className="h-px bg-gray-200 w-full"></div>
            
            <div className="space-y-4">
              {beer.description.map((paragraph, index) => (
                <p key={index} className="text-zinc-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="pt-6">
              <a 
                href="/shop" 
                className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors"
              >
                Shop Now
              </a>
              <a 
                href="/events" 
                className="inline-block ml-4 border border-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Find Events
              </a>
            </div>
            
            {/* Related Beers Section */}
            {beer.relatedBeers && beer.relatedBeers.length > 0 && (
              <div className="pt-8 mt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-4">You Might Also Like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {beer.relatedBeers.map(relatedSlug => {
                    const relatedBeer = beerCatalog[relatedSlug];
                    if (!relatedBeer) return null;
                    
                    return (
                      <Link 
                        key={relatedSlug} 
                        href={`/beer/${relatedSlug}`} 
                        className="group block"
                      >
                        <div className="relative aspect-square bg-white mb-2 overflow-hidden">
                          <Image
                            src={relatedBeer.images[0]}
                            alt={relatedBeer.name}
                            fill
                            className="object-contain p-4 transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h4 className="text-sm font-medium group-hover:underline">{relatedBeer.name}</h4>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}