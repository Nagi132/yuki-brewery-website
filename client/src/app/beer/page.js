"use client";

import React from 'react';
import Image from 'next/image';

const beers = [
  {
    id: 1,
    name: "STREET HAZE",
    type: "IPA",
    abv: "6.8%",
    description: "A hazy New England IPA that embodies the bold spirit of street culture.",
    madeWith: "Citra, Mosaic, and Galaxy hops, Premium 2-row malt, Flaked oats",
    tastesLike: "Tropical fruit, citrus zest, stone fruit, soft pine",
    pairsWith: "Spicy tacos, grilled chicken, sharp cheddar, street corn",
    vibeIs: "Skateboard on concrete at sunset",
    image: "/images/10.jpg"
  },
  {
    id: 2,
    name: "RAIL RIDER",
    type: "Pilsner",
    abv: "5.2%",
    description: "Crisp, clean pilsner that rewards you after a long session.",
    madeWith: "Noble hops, German pilsner malt, Traditional lager yeast",
    tastesLike: "Fresh bread, honey, lemon, subtle spice",
    pairsWith: "Burgers, pizza, fish tacos, mild gouda",
    vibeIs: "Perfect landing after trying all day",
    image: "/images/11.jpg"
  },
  {
    id: 3,
    name: "DECK PAINT",
    type: "Stout",
    abv: "7.4%",
    description: "Dark and smooth like fresh paint on a new deck.",
    madeWith: "Roasted barley, Chocolate malt, Fuggle hops, Coffee beans",
    tastesLike: "Dark chocolate, espresso, roasted nuts, vanilla",
    pairsWith: "BBQ ribs, dark chocolate, blue cheese, tiramisu",
    vibeIs: "Late night street sessions",
    image: "/images/12.jpg"
  }
];

export default function OurBeerPage() {
  return (
    <main className="min-h-screen bg-off-white relative">
      <div className="relative">
        {/* Header */}
        <div className="container mx-auto px-4 pt-16 pb-8">
          <h1 className="text-4xl font-bold tracking-wide text-zinc-900 text-center mb-4">OUR BEER</h1>
          <p className="text-zinc-700 text-lg text-center max-w-2xl mx-auto mb-16">
            Craft beers inspired by street culture, brewed with precision and attitude.
          </p>
        </div>

        {/* Beer List */}
        <div className="container mx-auto px-4 pb-24">
          <div className="space-y-24">
            {beers.map((beer, index) => (
              <div 
                key={beer.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Beer Image */}
                <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden group">
                  <Image
                    src={beer.image}
                    alt={beer.name}
                    fill
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Beer Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div>
                    <h2 className="text-3xl font-bold tracking-wide text-zinc-900">
                      {beer.name}
                    </h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-zinc-600 font-medium">{beer.type}</span>
                      <span className="text-amber-500 font-medium">{beer.abv} ABV</span>
                    </div>
                  </div>

                  <p className="text-zinc-700 text-lg">
                    {beer.description}
                  </p>

                  <div className="space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-black/5">
                    <div>
                      <h3 className="text-sm font-medium text-amber-500 mb-1">MADE WITH</h3>
                      <p className="text-zinc-900">{beer.madeWith}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-amber-500 mb-1">TASTES LIKE</h3>
                      <p className="text-zinc-900">{beer.tastesLike}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-amber-500 mb-1">PAIRS WITH</h3>
                      <p className="text-zinc-900">{beer.pairsWith}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-amber-500 mb-1">VIBE IS</h3>
                      <p className="text-zinc-900">{beer.vibeIs}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}