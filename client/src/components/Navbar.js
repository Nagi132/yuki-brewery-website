// client/src/components/Navbar.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { FaInstagram } from 'react-icons/fa';
import CartIcon from './CartIcon';

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

  const NavLink = ({ href, children, className = "" }) => {
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className={`group relative h-full flex items-center px-4 xl:px-6 ${className}`}
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

  return (
    <nav className="sticky top-0 z-50 transition-all duration-500 bg-off-white border-b border-black">
      <div className="w-full px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Links - Desktop */}
          <div className="hidden md:flex items-center h-full space-x-0 ml-1 text-xs">
            <NavLink href="/about">ABOUT</NavLink>
            <NavLink href="/beer">BEER</NavLink>
            <NavLink href="/events">EVENTS</NavLink>
            <NavLink href="/shop">SHOP</NavLink>
            <NavLink href="/find-us">FIND US</NavLink>
          </div>

          {/* Mobile Menu Text Button */}
          <div className="md:hidden ml-1">
            <button
              onClick={() => setIsOpen(true)}
              className="text-black font-normal focus:outline-none menu-button"
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
          <div className="hidden md:flex items-center h-full -mr-4">
            {/* CARRY SALTFIELDS link */}

            {/* CARRY SALTFIELDS link - TEMPORARILY DISABLED */}
            {/* <NavLink href="/carry">
              CARRY SALTFIELDS
            </NavLink> */}

            {/* Cart link */}
            {/* <NavLink href="/cart">
              CART ({cartCount})
            </NavLink> */}
            <Link href="/cart" className="group relative h-full flex items-center px-4 xl:px-6">
              <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
              <div className="relative z-10">
                <CartIcon />
              </div>
            </Link>
          </div>

          {/* Mobile Cart Text */}
          <div className="md:hidden mr-1">
            {/* <Link
              href="/cart"
              className="text-black tracking-wide"
            >
              <span>CART</span><span className="ml-1">({cartCount})</span>
            </Link> */}
            <Link href="/cart" className="text-black">
              <CartIcon />
            </Link>
          </div>
        </div>

        {/* Overlay for background when menu is open */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40" />
        )}

        {/* Mobile Menu Slide-in */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-3/4 max-w-xs bg-off-white z-50 mobile-menu transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="h-full overflow-y-auto p-6 flex flex-col">
            {/* Close Button */}
            <div className="mb-10 -ml-1">
              <button
                onClick={() => setIsOpen(false)}
                className="text-black font-normal focus:outline-none"
              >
                CLOSE
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              <MobileNavLink href="/about">ABOUT</MobileNavLink>
              <MobileNavLink href="/beer">BEER</MobileNavLink>
              <MobileNavLink href="/events">EVENTS</MobileNavLink>
              <MobileNavLink href="/shop">SHOP</MobileNavLink>
              <MobileNavLink href="/find-us">FIND US</MobileNavLink>
              {/* TEMPORARILY DISABLED */}
              {/* <MobileNavLink href="/carry">CARRY SALTFIELDS</MobileNavLink> */}
            </div>

            {/* Footer area */}
            <div className="mt-auto mb-16">
              {/* Footer area */}
              <div className="mt-auto mb-16">
                <div className="flex items-center  mt-6">
                  <a
                    href="https://instagram.com/saltfieldsbrewing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}