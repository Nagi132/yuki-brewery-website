"use client";

import React, { useEffect, useState, useRef } from 'react';

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
    }, []);

    return (
        <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[100vh] overflow-hidden bg-white">
            {/* Container with fixed width and padding */}
            <div className="absolute inset-0 w-full h-full">
                <div className="relative h-full max-w-[calc(100%-50px)] mx-auto">
                    {/* Video Element - removed poster attribute */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover bg-white transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transform: `translateY(${scrollPosition * 0.15}px)`,
                        }}
                    >
                        <source src="/videos/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Simple placeholder while video loads */}
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-white"></div>
                    )}
                </div>
            </div>
        </div>
    );
}