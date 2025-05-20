"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef(null);
  
  // Exhibition data - each panel corresponds to a section
  const exhibitionData = [
    {
      id: 'origins',
      title: 'WHERE IT ALL BEGAN',
      image: '/images/1.jpg',
      content: 'Born from the intersection of skateboarding and craft beer culture, Saltfields started as a simple idea in 2020. We wanted to create a space where the energy of street culture meets the craftsmanship of brewing. Our founder, drawing from years of experience in both worlds, saw an opportunity to bridge these communities. The name "Saltfields" comes from the salt-stained streets of New York City winters - where skaters would brave the elements, much like our commitment to brewing in any condition.'
    },
    {
      id: 'identity',
      title: 'CRAFTING OUR IDENTITY',
      image: '/images/2.jpg',
      content: 'Every can we produce is a canvas, featuring collaborations with local artists and skaters. Our designs reflect the raw energy of street culture while our brewing process honors traditional craftsmanship. We believe in creating beers that bring people together, whether you\'re fresh off a skating session or just appreciate quality craft beer. Each recipe is developed with the same attention to detail that goes into perfecting a new trick.'
    },
    {
      id: 'community',
      title: 'COMMUNITY FIRST',
      image: '/images/3.jpg',
      content: 'Today, Saltfields is more than just a brewery. It\'s a hub for creatives, skaters, and beer enthusiasts alike. We host events that celebrate both cultures, from art shows to video premieres, always accompanied by our latest brews. Our commitment to the community extends beyond our taproom. We actively support local skate initiatives and collaborate with artists from the scene, ensuring that every aspect of our brand gives back to the culture that inspired us.'
    }
  ];

  useEffect(() => {
    // Auto-advance exhibition panels
    const interval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % exhibitionData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-off-white text-zinc-900 overflow-hidden">
      {/* Intro Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <Image
            src="/images/2.jpg"
            alt="Saltfields backdrop"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-6xl md:text-8xl font-thin mb-8 text-white">SALTFIELDS</h1>
          <p className="text-xl md:text-2xl font-light tracking-wider mb-12 text-white">CRAFT BEER MEETS STREET CULTURE</p>
          <button 
            onClick={handleScrollDown}
            aria-label="Scroll to next section"
            className="w-12 h-12 mx-auto border-2 border-white rounded-full flex items-center justify-center animate-bounce hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Exhibition Section */}
      <section ref={containerRef} className="min-h-screen bg-off-white py-20">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="text-4xl font-thin mb-3 text-zinc-900">OUR STORY</h2>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">From street culture to craft beer, our journey of bringing together two worlds.</p>
        </div>
        
        <div className="relative max-w-7xl mx-auto h-[80vh] md:h-[70vh] px-4">
          {/* Exhibition panels */}
          <div className="exhibition-container relative h-full">
            {exhibitionData.map((panel, index) => (
              <motion.div
                key={panel.id}
                className={`exhibition-panel absolute w-full h-full top-0 left-0 ${
                  index === activePanel ? 'z-20' : 'z-10'
                }`}
                initial={false}
                animate={{
                  opacity: index === activePanel ? 1 : 0,
                  scale: index === activePanel ? 1 : 0.9,
                }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col md:flex-row h-full bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden curved-panel">
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                  </div>
                  
                  <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center p-6 md:p-12">
                    <div className="max-w-lg">
                      <h3 className="text-3xl font-medium mb-6 text-zinc-900">{panel.title}</h3>
                      <p className="text-zinc-700 text-lg">{panel.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Exhibition panel indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
              {exhibitionData.map((panel, index) => (
                <button
                  key={`indicator-${panel.id}`}
                  onClick={() => setActivePanel(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activePanel ? 'bg-zinc-900 scale-125' : 'bg-gray-400'
                  }`}
                  aria-label={`View ${panel.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-thin mb-16 text-center text-zinc-900">THE TEAM</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="fade-in-section">
              <div className="group relative overflow-hidden rounded-lg curved-panel-sm mb-5">
                <Image 
                  src="/images/10.jpg"
                  alt="Team member"
                  width={400}
                  height={500}
                  className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-medium mb-1 text-zinc-900">ALEX MILLER</h3>
              <p className="text-zinc-600">Founder & Head Brewer</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="fade-in-section delay-1">
              <div className="group relative overflow-hidden rounded-lg curved-panel-sm mb-5">
                <Image 
                  src="/images/11.jpg"
                  alt="Team member"
                  width={400}
                  height={500}
                  className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-medium mb-1 text-zinc-900">SARAH CHEN</h3>
              <p className="text-zinc-600">Creative Director</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="fade-in-section delay-2">
              <div className="group relative overflow-hidden rounded-lg curved-panel-sm mb-5">
                <Image 
                  src="/images/12.jpg"
                  alt="Team member"
                  width={400}
                  height={500}
                  className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-medium mb-1 text-zinc-900">JORDAN LOPEZ</h3>
              <p className="text-zinc-600">Community Manager</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final Statement */}
      <section className="py-24 bg-off-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="text-3xl md:text-4xl font-light italic mb-8 text-zinc-800">
              "Brewing isn't just about making beer. It's about creating experiences that bring people together."
            </p>
            <cite className="text-lg text-zinc-600">— Saltfields Brewing Team</cite>
          </blockquote>
        </div>
      </section>
      
      <style jsx global>{`
        .curved-panel {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transform: perspective(1000px) rotateY(-5deg);
        }
        
        .curved-panel-sm {
          border-radius: 20% 80% 60% 40% / 30% 30% 70% 70%;
          transform: perspective(800px) rotateY(-3deg);
        }
        
        .exhibition-container {
          perspective: 1000px;
        }
        
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-1 {
          transition-delay: 0.2s;
        }
        
        .delay-2 {
          transition-delay: 0.4s;
        }
      `}</style>
    </main>
  );
}