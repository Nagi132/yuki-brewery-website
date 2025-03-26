// src/components/Footer.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Newsletter form state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  // Get Shopify domain from environment variable or use placeholder
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'w0gjqw-en.myshopify.com';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Redirect to Shopify's customer signup page with the email pre-filled
    const signupUrl = `https://${shopifyDomain}/account/register?checkout%5Bemail%5D=${encodeURIComponent(email)}&checkout%5Bget_marketing_update%5D=true`;
    window.location.href = signupUrl;
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.email || !contactForm.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setContactStatus({
      ...contactStatus,
      isSubmitting: true
    });
    
    try {
      // This is where you would normally send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form and show success message
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
      
      setContactStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setContactStatus(prev => ({
          ...prev,
          isSubmitted: false
        }));
      }, 5000);
    } catch (error) {
      setContactStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <footer className="bg-[#F3F4F6] pt-8 pb-6 px-4 md:px-6 lg:px-8">
      {/* Top Border */}
      <div className="flex justify-center">
        <hr className="w-full my-3 -mt-3 border-0 h-[1px] bg-black" />
      </div>

      <div className="container mx-auto">
        {/* Two Column Layout with equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Contact Form */}
          <div>
            <p className="font-medium tracking-wider mb-4">CONTACT</p>
            <p className="text-sm mb-4 text-gray-700">
              Send us a message. We'd love to hear from you.
            </p>
            
            {contactStatus.isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded">
                Thank you for your message! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  required
                  disabled={contactStatus.isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="Your email"
                  className="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                  required
                  disabled={contactStatus.isSubmitting}
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Your message"
                  rows={7}
                  className="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black resize-none"
                  required
                  disabled={contactStatus.isSubmitting}
                ></textarea>
                
                {/* Smaller Send Button */}
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className={`px-8 py-2 bg-black text-white text-sm transition-colors ${
                      contactStatus.isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-gray-800'
                    }`}
                    disabled={contactStatus.isSubmitting}
                  >
                    {contactStatus.isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
                
                {contactStatus.error && (
                  <p className="text-red-600 text-xs">{contactStatus.error}</p>
                )}
              </form>
            )}
          </div>
          
          {/* Right Column - Menu, Social, and Newsletter */}
          <div>
            {/* Menu Section */}
            <p className="font-medium tracking-wider mb-3">MENU</p>
            <div className="space-y-2 text-gray-700 mb-4">
              <div>
                <Link href="/about" className="hover:text-black transition-colors">
                  ABOUT
                </Link>
              </div>
              <div>
                <Link href="/shop" className="hover:text-black transition-colors">
                  SHOP
                </Link>
              </div>
              <div>
                <Link href="/beer" className="hover:text-black transition-colors">
                  BEER
                </Link>
              </div>
              <div>
                <Link href="/events" className="hover:text-black transition-colors">
                  EVENTS
                </Link>
              </div>
              <div>
                <Link href="/carry" className="hover:text-black transition-colors">
                  CARRY SALTFIELDS
                </Link>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="mb-2">
              <div className="flex items-center gap-4">
                <Link 
                  href="https://instagram.com/saltfieldsbrewing/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link 
                  href="mailto:hello@saltfields.com" 
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </Link>
              </div>
            </div>
            
            {/* Newsletter Section - Inline form with narrower signup button */}
            <div>
              <p className="font-medium tracking-wider mb-2">NEWSLETTER</p>
              <p className="text-sm mb-4 text-gray-700">Stay updated with new releases and events.</p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-1/2 px-4 py-2 text-sm border border-r-0 border-gray-300 focus:outline-none focus:border-black"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className={`w-24 px-4 py-2 bg-black text-white text-sm transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-gray-800'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing...' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} SALTFIELDS BREWING. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-black transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}