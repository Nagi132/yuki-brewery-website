"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaInstagram, FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActivePage = (path) => {
    return pathname === path;
  };

  const NavLink = ({ href, children }) => {
    const isActive = isActivePath(href);
    return (
      <Link 
        href={href} 
        onClick={handleLinkClick}
        className={`group text-gray-800 font-medium tracking-wide transition-colors relative ${
          isActive ? 'text-[#ffdd00]' : ''
        }`}
      >
        <span className={`hover:text-[#ffdd00] transition-colors ${
          isActive ? 'text-[#ffdd00]' : ''
        }`}>{children}</span>
        <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#ffdd00] transform transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}></span>
      </Link>
    );
  };

  const MobileNavLink = ({ href, children }) => {
    const isActive = isActivePath(href);
    return (
      <Link 
        href={href} 
        onClick={handleLinkClick}
        className={`text-gray-800 font-medium p-3 rounded-md hover:bg-black/5 transition-all duration-300 ${
          isActive ? 'text-[#ffdd00] bg-black/5' : 'hover:text-[#ffdd00]'
        }`}
      >
        {children}
      </Link>
    );
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white shadow-md' 
          : 'bg-[#f0f8ff]'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/story">STORY</NavLink>
            <NavLink href="/our-beer">OUR BEER</NavLink>
            <NavLink href="/shop">SHOP</NavLink>
            <NavLink href="/contact">CONTACT</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="text-gray-800 hover:text-[#ffdd00] focus:outline-none transition-colors p-2 rounded-md hover:bg-black/5"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <FaTimes size={24} className="transform transition-transform duration-300 rotate-90" />
              ) : (
                <FaBars size={24} className="transform transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex-grow flex justify-center items-center h-20 mt-3 mr-48">
            <Link href="/" className="transform transition-all duration-300 hover:scale-105">
              <div className="relative h-full">
                <Image
                  src="/images/saltfields_logo.webp"
                  alt="Saltfields Brewing Logo"
                  width={275}
                  height={275}
                  priority
                  className="cursor-pointer object-contain"
                  style={{ transform: 'scale(1.2)' }}
                />
              </div>
            </Link>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="https://instagram.com/saltfields"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[#ffdd00] transition-colors transform hover:scale-110 duration-300"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="/cart"
              className="group relative flex items-center space-x-2 border border-black text-gray-900 px-6 py-2 rounded-md font-medium tracking-wide overflow-hidden"
            >
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <FaShoppingCart size={18} className="relative z-10 group-hover:text-white transition-colors duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">CART</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ffdd00] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div 
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t transform transition-transform duration-300"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div className="flex flex-col py-4 px-4 space-y-3">
              <MobileNavLink href="/story">STORY</MobileNavLink>
              <MobileNavLink href="/our-beer">OUR BEER</MobileNavLink>
              <MobileNavLink href="/shop">SHOP</MobileNavLink>
              <MobileNavLink href="/contact">CONTACT</MobileNavLink>
              <Link 
                href="/cart" 
                onClick={handleLinkClick}
                className="flex items-center space-x-2 border border-black text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaShoppingCart size={18} />
                <span>CART</span>
                {cartCount > 0 && (
                  <span className="bg-[#ffdd00] text-black text-xs px-2 py-1 rounded-full ml-2">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="https://instagram.com/saltfields"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 p-3 rounded-md hover:bg-black/5 transition-all duration-300"
              >
                <FaInstagram size={20} />
                <span>FOLLOW US</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}