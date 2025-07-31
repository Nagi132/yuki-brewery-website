// client/src/app/rice-lager/page.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function RiceLagerPage() {
  // State for image rotation and content tab
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('beer'); // 'beer' or 'story'

  // Can images array
  const canImages = [
    '/images/Saltfields_Brewing_Can_Front.webp',
    '/images/Saltfields_Brewing_Can_Left.webp',
    '/images/Saltfields_Brewing_Can_Right.webp'
  ];

  // Function to rotate images
  const rotateImage = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % canImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + canImages.length) % canImages.length);
    }
  };

  return (
    <main className="min-h-screen bg-off-white  md:pt-6">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white p-8 shadow-sm">
          {/* Rice Lager Beer Section */}
          <div className="flex flex-col md:flex-row gap-1 mx-auto mt-8">
            {/* Beer Image with Custom Rotation */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Image container with arrows */}
                <div className="relative aspect-[3/4] w-full">
                  <button
                    onClick={() => rotateImage('next')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg fill="#000000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.002 330.002">
                      <path d="M96.75,155.997L209.25,6.001c4.972-6.628,14.372-7.97,21-3c6.628,4.971,7.971,14.373,3,21 l-105.75,140.997L233.25,306.001c4.971,6.627,3.627,16.03-3,21c-2.698,2.024-5.856,3.001-8.988,3.001 c-4.561,0-9.065-2.072-12.012-6.001l-112.5-150.004C92.75,168.664,92.75,161.33,96.75,155.997z" />
                    </svg>
                  </button>

                  {/* Main Image */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={canImages[currentImageIndex]}
                        alt={`Saltfields Rice Lager ${currentImageIndex === 0 ? 'Front' : currentImageIndex === 1 ? 'Left View' : 'Right View'}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Right Arrow */}
                  <button
                    onClick={() => rotateImage('prev')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/70 hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg fill="#000000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.002 330.002">
                      <path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
                    </svg>
                  </button>
                </div>

                {/* Image number indicators 
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {canImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>*/}
              </div>
            </div>

            {/* Content Section with Tabs */}
            <div className="flex-1 pt-8 md:ml-8">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('beer')}
                  className={`pb-1 px-4 text-sm font-medium relative ${activeTab === 'beer' ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  THE BEER
                  {activeTab === 'beer' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      layoutId="underline"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-1 px-4 text-sm font-medium relative ${activeTab === 'story' ? 'bg-black text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  THE STORY BEHIND THE LABEL
                  {activeTab === 'story' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      layoutId="underline"
                    />
                  )}
                </button>
              </div>

              {/* Content Area */}
              <div className="min-h-[600px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'beer' ? (
                    <motion.div
                      key="beer-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Beer Title */}
                      <div className="mb-6">
                        <h1 className="text-2xl font-normal tracking-wide mb-1">
                          <span className="text-base font-normal opacity-80">SALTFIELDS</span> RICE LAGER
                        </h1>
                        <div className="w-11/12 h-0.5 bg-black md:w-3/4"></div>
                      </div>

                      {/* Beer Specs */}
                      <div className="mb-8 space-y-1 text-sm">
                        <p><span className="font-bold">"NODOGOSHI"</span> Supremely Dry and Delicious</p>
                        <p>Brewed with Rice and Koji</p>
                        <p>1 Pint 4.7% ALC/VOL</p>
                      </div>

                      {/* Beer Description */}
                      <div className="space-y-4 max-w-xl">
                        <p className="text-justify text-xs">
                          Crisp, dry, and endlessly refreshing, this Japanese-inspired Rice Lager brings together tradition and innovation in every sip. Brewed with a base of German Pilsner malt, a blend of flaked rice and whole grain Calrose rice, and a touch of white Koji, this beer develops a delicate acidity that enhances its clean, snappy finish.
                        </p>

                        <p className="text-justify text-xs">
                          We brew with Calrose rice, a grain first carried to American soil by Japanese hands, then lovingly refined over time. We, too, are travelers from Japan, drawn across the ocean by hope and purpose. In reverence to that journey, we chose this rice as the heart of our very first beer, a quiet tribute to our heritage and roots.
                        </p>
                        {/* 
                        <p className="text-justify text-sm">
                          Noble hops Perle, Hallertau, and Tettnang provide a soft floral and spicy balance, while 34/70 German lager yeast ensures a crisp fermentation with high attenuation. The result is a brilliantly bright, supremely crushable lager beer.
                        </p> */}

                        <p className="text-justify text-xs">
                          Best enjoyed ice cold, this beer is perfect for hot beach days, late-night Izakaya sessions, and pairing with fresh seafood or crispy Karaage (Japanese fried chicken).
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="story-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Story Title */}
                      <div className="mb-6">
                        <h1 className="text-2xl font-normal tracking-wide mb-1">
                          The Story Behind the Label
                        </h1>
                      </div>

                      {/* Subtitle */}
                      <p className="mb-4 text-sm font-bold">Yosemoji × Graffiti — A Fusion of Japan and New York</p>

                      {/* Story Description */}
                      <div className="space-y-4 max-w-xl">
                        <p className="text-justify text-xs">
                          By blending the elegance of traditional Japanese calligraphy with the raw energy of New York street graffiti, we've created a bold new form of visual expression, one that bridges two distinct cultures and tells our story.
                        </p>

                        <p className="text-justify text-xs">
                          At the heart of this fusion is Yosemoji, a calligraphic style born in the Edo period. Known for its rich, ink-laden strokes and upward-slanting form, Yosemoji was traditionally used on theater posters and shop signs. Its purpose was more than aesthetic, it was symbolic.
                        </p>

                        <p className="text-justify text-xs">
                          Its bold, ink-laden strokes, written to minimize empty space, expressed a wish to fill seats. The upward angle expressed a wish to grow. Over time, Yosemoji became known as a lucky script, a style tied to prosperity and connection.
                        </p>

                        <p className="text-justify text-xs">
                          This spirit aligns with Saltfields Brewing's vision: to create a place where people gather, connect, and cultivate culture.
                        </p>

                        <p className="text-justify text-xs">
                          With <span className="italic">Yosemoji Graffiti</span>, we aim to establish a visual identity that is distinctly our own, one that echoes our roots in both Japan and New York. We hope to make this a signature style of Saltfields Brewing, leaving a lasting impression of the world we're building.
                        </p>

                        <p className="text-justify text-xs">
                          For our first label, we collaborated with a calligrapher friend to bring this vision to life. The result: a striking rendering of 米麦酒 (Rice Beer) in Yosemoji Graffiti, our tribute to tradition, reimagined.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}