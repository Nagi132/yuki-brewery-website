"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[100vh] overflow-hidden">
            {/* Main Hero Image */}
            <Image
                src="/images/hero-holder.jpg"
                alt="Street Brewery Hero"
                fill
                priority
                quality={100}
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    objectPosition: '50% 50%', // Adjust this to control the focus point
                    transform: `scale(${isLoaded ? '1' : '1.1'}) translateY(${scrollPosition * 0.5}px)`,
                    transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
                }}
                className={`
                    duration-700 ease-in-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0 scale-110'}
                `}
                onLoadingComplete={() => setIsLoaded(true)}
            />

            {/* Subtle Gradient Overlay */}
            <div 
                className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
                style={{
                    transform: `translateY(${scrollPosition * 0.3}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
            )}
        </div>
    );
}