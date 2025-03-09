"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            // Setup event listeners before trying to play the video
            videoRef.current.addEventListener('canplay', () => {
                setIsLoaded(true);
            });
            
            // Try to play the video
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
                // Even if autoplay fails, we'll still consider it "loaded"
                // so we don't keep showing a loading state forever
                setIsLoaded(true);
            });
        }

        // Set a fallback timer in case the video takes too long to load
        const fallbackTimer = setTimeout(() => {
            if (!isLoaded) setIsLoaded(true);
        }, 8000);

        return () => clearTimeout(fallbackTimer);
    }, []);

    return (
        <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[100vh] overflow-hidden bg-off-white">
            {/* Container with fixed width and padding */}
            <div className="absolute inset-0 w-full h-full">
                <div className="relative h-full max-w-[calc(100%-50px)] mx-auto">
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover bg-off-white transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transform: `translateY(${scrollPosition * 0.15}px)`,
                        }}
                    >
                        <source src="/videos/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Animated Loader */}
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-off-white flex flex-col items-center justify-center">
                            <div className="relative w-24 h-24 mb-4">
                                {/* Optional: Show logo while loading */}
                                <Image
                                    src="/images/saltfields_logo.webp"
                                    alt="Saltfields Brewing"
                                    fill
                                    className="object-contain animate-pulse"
                                />
                            </div>
                            
                            {/* Spinner animation */}
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
                            </div>
                            
                            {/* Loading text */}
                            <p className="mt-4 text-zinc-600 text-sm font-medium">Loading experience...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}