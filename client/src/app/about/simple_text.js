"use client";

import React from 'react';

export default function SimpleText() {
    return (
        <div className="bg-off-white min-h-screen mt-12">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left side - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-md">
                            <svg
                                className="w-full h-auto"
                                viewBox="0 0 400 500"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="400" height="500" fill="#f5f5f0" stroke="#d1d5db" strokeWidth="2" />
                                <rect x="50" y="50" width="300" height="200" fill="#e5e7eb" />
                                <circle cx="200" cy="150" r="30" fill="#9ca3af" />
                                <rect x="50" y="280" width="300" height="8" fill="#d1d5db" />
                                <rect x="50" y="300" width="250" height="6" fill="#d1d5db" />
                                <rect x="50" y="320" width="280" height="6" fill="#d1d5db" />
                                <rect x="50" y="340" width="200" height="6" fill="#d1d5db" />
                                <text x="200" y="420" textAnchor="middle" className="fill-zinc-500 text-sm">
                                    Placeholder Image
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Right side - Text */}
                    <div className="space-y-4">
                        {/* Heading */}
                        <h1 className="text-xl md:text-2xl font-light mb-6 tracking-wide text-zinc-900">
                            About Saltfields Brewing
                        </h1>

                        {/* Content paragraphs */}
                        <div className="space-y-0 text-xs leading-relaxed font-normal text-black text-justify">
                            <p>
                                Yuki and Yumi are the husband-and-wife team behind Saltfields, the first Japanese craft beer company in New York.
                            </p>
                            <br />
                            <p>
                                They fell in love with Brooklyn's vibrant craft beer scene and culture, eventually finding themselves working in local breweries—learning the art of brewing and immersing themselves in a passionate, creative community. Inspired by their experience and driven by a shared dream, they decided to create something only they could: a brewery that brings the heart of Japanese culture to New York, one beer at a time.
                            </p>
                            <br />
                            <p>
                                With the incredible support of friends and mentors in the New York craft beer scene, they were finally able to take the leap. On April 4, 2025, they proudly completed their first batch of beer—marking the beginning of their journey.
                            </p>

                            <p>
                                While Saltfields doesn't yet have a physical brewery or taproom, the team is starting small—self-distributing to local restaurants, bars, and grocery stores. More than just beer, every can and keg is a way to share a piece of their culture and story with the city they love.
                            </p>
                            <br />
                            <p>
                                In the next year or two, they hope to open a space of their own: a warm, welcoming place where people can gather, sip, and connect.
                            </p>
                            <br />
                            <p>
                                At Saltfields, we believe beer is freedom. It's fun. It adds color to life. It can take center stage or play a quiet supporting role. Above all, it's a way to bring people together—an affordable luxury that makes us smile.
                            </p>
                            <br />
                            <p>                                We're just getting started. And we can't wait to see where this journey takes us.
                            </p>
                            {/* <p className="text-sm font-normal text-zinc-900 pt-2">
                                We're just getting started. And we can't wait to see where this journey takes us.
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 