"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // If menu is open and click is outside the menu and not on the menu button
      if (isOpen && 
          !e.target.closest('.mobile-menu') && 
          !e.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const NavLink = ({ href, children }) => {
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className="group relative h-full flex items-center px-4 xl:px-6"
      >
        <span className="z-10 transition-colors duration-200 group-hover:text-white">
          {children}
        </span>
        <span 
          className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        ></span>
      </Link>
    );
  };

  const MobileNavLink = ({ href, children }) => {
    return (
      <div className="py-4">
        <Link
          href={href}
          onClick={handleLinkClick}
          className="text-black font-normal text-base"
        >
          {children}
        </Link>
      </div>
    );
  };

  // Cart link component for consistent styling
  const CartLink = ({ className = "" }) => (
    <Link
      href="/cart"
      className={`text-black tracking-wide ${className}`}
    >
      <span>CART</span><span className="ml-1">({cartCount})</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 transition-all duration-500 bg-white border-b border-black">
      <div className="w-full px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Links - Desktop */}
          <div className="hidden md:flex items-center h-full space-x-2 md:space-x-4 lg:space-x-1 -ml-4">
            <NavLink href="/about">ABOUT</NavLink>
            <NavLink href="/beer">BEER</NavLink>
            <NavLink href="/events">EVENTS</NavLink>
            <NavLink href="/shop">SHOP</NavLink>
          </div>

          {/* Mobile Menu Text Button */}
          <div className="md:hidden ml-1">
            <button
              onClick={() => setIsOpen(true)}
              className="text-black font-medium focus:outline-none menu-button"
              aria-label="Open navigation menu"
            >
              MENU
            </button>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="transform transition-all duration-300 hover:scale-105">
              <div className="relative">
                <Image
                  src="/images/saltfields_logo.webp"
                  alt="Saltfields Brewing Logo"
                  width={160}
                  height={48}
                  priority
                  className="cursor-pointer object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right Links - Desktop */}
          <div className="hidden md:flex items-center -mr-4">
            <Link
              href="https://instagram.com/saltfieldsbrewing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black transition-colors transform hover:scale-110 duration-300 mr-6"
            >
              <FaInstagram size={24} />
            </Link>
            
            {/* Desktop Cart - Now using same style as mobile */}
            <CartLink className="mr-1" />
          </div>

          {/* Mobile Cart Text */}
          <div className="md:hidden mr-1">
            <CartLink />
          </div>
        </div>

        {/* Overlay for background when menu is open */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40" />
        )}

        {/* Mobile Menu Slide-in */}
        <div 
          className={`md:hidden fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 mobile-menu transition-transform duration-700 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto p-6 flex flex-col">
            {/* Close Button */}
            <div className="mb-10 -ml-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black font-medium focus:outline-none"
              >
                Close
              </button>
            </div>
            
            {/* Menu Items (same as desktop) */}
            <div className="space-y-4">
              <MobileNavLink href="/about">ABOUT</MobileNavLink>
              <MobileNavLink href="/beer">BEER</MobileNavLink>
              <MobileNavLink href="/events">EVENTS</MobileNavLink>
              <MobileNavLink href="/shop">SHOP</MobileNavLink>
            </div>
            
            {/* Social Links - Using margin-top: auto to push to bottom */}
            <div className="mt-auto mb-16">
              <Link
                href="https://instagram.com/saltfieldsbrewing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black inline-block"
                onClick={handleLinkClick}
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}