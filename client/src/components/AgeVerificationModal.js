// src/components/AgeVerificationModal.js
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem('ageVerified');
    
    // If not verified yet, show the modal
    if (!ageVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = (isOldEnough) => {
    if (isOldEnough) {
      // User is old enough, save to localStorage and close modal
      localStorage.setItem('ageVerified', 'true');
      setIsOpen(false);
    } else {
      // User is not old enough, show underage message
      setIsUnderage(true);
      // Don't store anything in localStorage so they'll be asked again if they return
    }
  };

  const handleGoBack = () => {
    // Go back to previous page in browser history (e.g., Google or referring site)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if there's no history (e.g., if opened directly)
      window.location.href = "https://www.google.com";
    }
  };

  // If modal is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-sm max-w-md w-full mx-4 overflow-hidden shadow-lg">
        {!isUnderage ? (
          // Age verification dialog
          <div className="p-6">
            <div className="flex justify-center mb-6 pt-4">
              <Image
                src="/images/saltfields_logo.webp"
                alt="Saltfields Brewing Logo"
                width={180}
                height={48}
                className="object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">Age Verification</h2>
            
            <p className="text-center mb-8 text-sm">
              Are you old enough to drink?
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleVerify(true)}
                className="px-8 py-3 bg-black text-white font-medium hover:bg-zinc-800 transition-colors rounded-sm"
              >
                YES
              </button>
              
              <button
                onClick={() => handleVerify(false)}
                className="px-8 py-3 border border-black text-black font-medium hover:bg-gray-100 transition-colors rounded-sm"
              >
                NO
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-8">
              Please drink responsibly.
            </p>
          </div>
        ) : (
          // Underage message
          <div className="p-6">
            <div className="flex justify-center mb-6 pt-4">
              <Image
                src="/images/saltfields_logo.webp"
                alt="Saltfields Brewing Logo"
                width={180}
                height={48}
                className="object-contain"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">We're Sorry</h2>
            
            <p className="text-center mb-8">
              You must be of legal drinking age to view this website.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-black text-white font-medium hover:bg-zinc-800 transition-colors rounded-sm"
              >
                GO BACK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}