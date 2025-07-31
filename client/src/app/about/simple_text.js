"use client";

import React from 'react';
import Image from 'next/image';

export default function SimpleText() {
    return (
        <div className="bg-off-white -mt-6">
            <div className="flex justify-center px-6 py-8 md:py-12 lg:py-16 lg:pb-32">
                <div className="w-full max-w-4xl md:max-w-lg lg:max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                        {/* Left side - Image */}
                        <div className="flex justify-center md:justify-start lg:justify-start mt-5 md:mt-0 lg:mt-4 md:ml-0 lg:ml-20">
                            <div className="w-[480px] h-[480px] md:w-[520px] md:h-[580px] lg:w-[480px] lg:h-[605px] relative">                              <Image
                                src="/images/Saltfields_About.webp"
                                alt="Saltfields Brewing"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
                                className="object-contain"
                            />
                            </div>
                        </div>

                        {/* Right side - Text */}
                        <div className="pt-8 md:pt-12 lg:pt-10 lg:pl-0">
                            {/* Heading */}
                            <div className="space-y-2">
                                <h1 className="text-[1.65rem] font-normal mb-5">
                                    Saltfields:
                                </h1>
                                <h1 className="text-xl font-normal">
                                    The First Japanese Craft Beer in New York
                                </h1>
                            </div>

                            {/* Content paragraphs */}
                            <div className="space-y-4 text-xs font-normal mt-10 max-w-md">
                                <p className="text-justify">
                                    Yuki and Yumi are the husband-and-wife team behind Saltfields, the first Japanese craft beer company in New York.
                                </p>
                                <br />

                                <p className="text-justify">
                                    They fell in love with Brooklyn's vibrant craft beer scene and culture, eventually finding themselves working in local breweries—learning the art of brewing and immersing themselves in a passionate, creative community. Inspired by their experience and driven by a shared dream, they decided to create something only they could: a brewery that brings the heart of Japanese culture to New York, one beer at a time.
                                </p>

                                <p className="text-justify">
                                    With the incredible support of friends and mentors in the New York craft beer scene, they were finally able to take the leap. On April 4, 2025, they proudly completed their first batch of beer—marking the beginning of their journey.
                                </p>

                                <p className="text-justify">
                                    While Saltfields doesn't yet have a physical brewery or taproom, the team is starting small—self-distributing to local restaurants, bars, and grocery stores. More than just beer, every can and keg is a way to share a piece of their culture and story with the city they love.
                                </p>

                                <p className="text-justify">
                                    In the next year or two, they hope to open a space of their own: a warm, welcoming place where people can gather, sip, and connect.
                                </p>

                                <p className="text-justify">
                                    At Saltfields, we believe beer is freedom. It's fun. It adds color to life. It can take center stage or play a quiet supporting role. Above all, it's a way to bring people together—an affordable luxury that makes us smile.
                                </p>

                                <p className="text-justify">
                                    We're just getting started. And we can't wait to see where this journey takes us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}