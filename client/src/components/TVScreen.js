import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Individual TV Screen Component
export default function TVScreen({ screen, isPowered, isStatic, isFocused, onFocus }) {
  const [randomStatic, setRandomStatic] = useState(false);
  const [horizontalStaticLine, setHorizontalStaticLine] = useState(null);
  
  // Almost no motion - minimal parameters
  const getRandomStaticParams = () => {
    return {
      x: Math.random() * 0.1 - 0.05, // Extremely minimal movement
      y: Math.random() * 0.1 - 0.05, // Extremely minimal movement
      rotate: 0, // No rotation
    };
  };
  
  const timeoutRef = useRef(null);
  const staticTimeoutRef = useRef(null);
  const horizontalStaticRef = useRef(null);
  
  // Random Focus effect - much less often
  useEffect(() => {
    if (isPowered && !isStatic) {
      const randomGlitch = () => {
        const glitchChance = Math.random();
        
        // 1% chance of glitch - very rare
        if (glitchChance > 0.99) {
          onFocus(); // Activate screen temporarily
          timeoutRef.current = setTimeout(() => {
            onFocus(); // Deactivate screen after short delay
          }, 300 + Math.random() * 500);
        }
        
        // Schedule next glitch - less frequently
        timeoutRef.current = setTimeout(randomGlitch, 10000 + Math.random() * 20000);
      };
      
      timeoutRef.current = setTimeout(randomGlitch, 10000 + Math.random() * 20000);
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isPowered, isStatic, onFocus]);
  
  // Random static flashes - MUCH more frequent
  useEffect(() => {
    if (isPowered && !isStatic) {
      const triggerRandomStatic = () => {
        // 40% chance of static - very high
        if (Math.random() > 0.6) {
          setRandomStatic(true);
          
          // Static duration varies
          setTimeout(() => {
            setRandomStatic(false);
          }, 200 + Math.random() * 400);
        }
        
        // Schedule next static - very frequent
        staticTimeoutRef.current = setTimeout(triggerRandomStatic, 1000 + Math.random() * 3000);
      };
      
      staticTimeoutRef.current = setTimeout(triggerRandomStatic, 1000 + Math.random() * 2000);
      
      return () => {
        if (staticTimeoutRef.current) {
          clearTimeout(staticTimeoutRef.current);
        }
      };
    }
  }, [isPowered, isStatic]);
  
  // Random horizontal static lines
  useEffect(() => {
    if (isPowered && !isStatic) {
      const triggerHorizontalStatic = () => {
        // 30% chance of horizontal static line
        if (Math.random() > 0.7) {
          // Generate random position and height
          const position = Math.random() * 100;
          const height = 5 + Math.random() * 15; // Line height between 5-20px
          const opacity = 0.7 + Math.random() * 0.3; // Line opacity between 0.7-1
          
          setHorizontalStaticLine({
            position,
            height,
            opacity
          });
          
          // Remove the line after a brief moment
          setTimeout(() => {
            setHorizontalStaticLine(null);
          }, 100 + Math.random() * 300);
        }
        
        // Schedule next horizontal static
        horizontalStaticRef.current = setTimeout(triggerHorizontalStatic, 800 + Math.random() * 2000);
      };
      
      horizontalStaticRef.current = setTimeout(triggerHorizontalStatic, 1000 + Math.random() * 2000);
      
      return () => {
        if (horizontalStaticRef.current) {
          clearTimeout(horizontalStaticRef.current);
        }
      };
    }
  }, [isPowered, isStatic]);
  
  // More pillow-like TV shape with custom CSS
  const tvShape = {
    borderRadius: '40% / 30%', // Much more curved for pillow shape
    border: '3px solid rgba(255,255,255,0.7)',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    overflow: 'hidden', // Ensure content doesn't spill outside the border
    padding: '0', // Remove any internal padding
  };
  
  return (
    <div className={`tv-screen-container mx-auto ${isFocused ? 'z-20' : 'z-10'}`}>
      <motion.div 
        className={`tv-unit relative ${isFocused ? 'scale-105' : ''}`}
        animate={isPowered ? getRandomStaticParams() : {}}
        transition={{
          duration: 1.5, // Slower movement
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        {/* TV Frame - pillow shape with white border */}
        <div className="tv-frame" style={tvShape}>
          {/* Screen */}
          <div 
            className="tv-screen relative overflow-hidden cursor-pointer bg-black" /* Added bg-black */
            style={{ borderRadius: '35% / 25%', aspectRatio: '4/3' }}
            onClick={() => onFocus()}
          >
            {/* Power off state */}
            <AnimatePresence>
              {!isPowered && (
                <motion.div 
                  className="absolute inset-0 bg-black z-30 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-[2px] w-1/2 bg-white/20 rounded-full"></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Full-screen static effect - higher opacity */}
            <AnimatePresence>
              {(isStatic || randomStatic) && (
                <motion.div 
                  className="absolute inset-0 bg-static z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: randomStatic ? 0.8 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              )}
            </AnimatePresence>
            
            {/* Horizontal static line */}
            {horizontalStaticLine && (
              <div 
                className="absolute left-0 right-0 bg-horizontal-static z-25"
                style={{
                  top: `${horizontalStaticLine.position}%`,
                  height: `${horizontalStaticLine.height}px`,
                  opacity: horizontalStaticLine.opacity
                }}
              ></div>
            )}
            
            {/* Content */}
            <div className="absolute inset-0 z-10">
              {/* Special case for credits screen */}
              {screen.isSpecial ? (
                <div className="relative w-full h-full bg-white flex flex-col justify-center items-center">
                  <h3 className="text-2xl md:text-3xl font-black tracking-wide text-black mb-4">
                    {screen.title}
                  </h3>
                  <p className="text-lg text-black">{screen.content}</p>
                </div>
              ) : (
                <>
                  {screen?.image && (
                    <div className="relative w-full h-full bg-black"> {/* Black background to prevent white space */}
                      <Image 
                        src={screen.image}
                        alt={screen.title}
                        fill
                        className="object-cover brightness-75 contrast-125"
                        priority
                      />
                    </div>
                  )}
                  
                  {/* Permanent static overlay - increased to 30% */}
                  <div className="absolute inset-0 bg-static opacity-30 mix-blend-overlay"></div>
                  
                  {/* Dot matrix pattern */}
                  <div className="absolute inset-0 dot-matrix opacity-40"></div>
                  
                  {/* Content overlay */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-black/30"
                    initial={false}
                    animate={{ 
                      backgroundColor: isFocused ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.3)' 
                    }}
                  >
                    <h3 className="text-lg md:text-xl font-extrabold tracking-wider text-white mb-2 glow-text">
                      {screen?.title}
                    </h3>
                    
                    {isFocused && (
                      <motion.p 
                        className="text-sm text-white/90 max-w-[90%]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {screen?.content}
                      </motion.p>
                    )}
                  </motion.div>
                </>
              )}
            </div>
            
            {/* CRT effects overlay - not applied to special screens */}
            {!screen.isSpecial && (
              <div className="absolute inset-0 z-15 pointer-events-none">
                {/* Scanlines */}
                <div className="absolute inset-0 scanlines opacity-70"></div>
                
                {/* Vignette */}
                <div className="absolute inset-0 vignette"></div>
                
                {/* Random static lines - more of them */}
                <div className="absolute inset-0 overflow-hidden">
                  {isPowered && Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={`hline-${screen?.id}-${i}`} 
                      className="absolute w-full h-[3px] bg-white/40 left-0 animate-staticline"
                      style={{
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${0.1 + Math.random() * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* RGB shift */}
                <div className="absolute inset-0 rgb-shift mix-blend-screen opacity-50"></div>
                
                {/* Screen flicker */}
                <div className="absolute inset-0 screen-flicker"></div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}