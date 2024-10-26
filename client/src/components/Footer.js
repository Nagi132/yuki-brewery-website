import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-8 pb-6 px-4 md:px-6 lg:px-8">
      {/* Top Border */}
      <div className="flex justify-center">
        <hr className="w-full my-3 -mt-3 border-0 h-[1px] bg-black" />
      </div>

      <div className="container mx-auto">
        {/* Logo Section */}
        <div className="flex justify-center mb-10">
          <div className="h-12 relative">
            <Image
              src="/images/saltfields_logo.webp"
              alt="Saltfields Logo"
              width={180}
              height={48}
              className="object-contain"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 text-sm text-black">
          {/* Hours & Location */}
          <div className="space-y-6">
            <div>
              <p className="font-medium tracking-wider mb-3">HOURS</p>
              <div className="space-y-1.5 text-gray-700">
                <p>MON-THU: 11AM - 10PM</p>
                <p>FRI-SAT: 11AM - 11PM</p>
                <p>SUN: 12PM - 8PM</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <p className="font-medium tracking-wider mb-3">LOCATION</p>
              <div className="space-y-1.5 text-gray-700">
                <p>43 CANAL STREET</p>
                <p>NEW YORK, NY 10002</p>
                <p className="mt-3">(212) 226-2545</p>
                <Link 
                  href="mailto:hello@saltfields.com" 
                  className="block mt-3 hover:text-black transition-colors"
                >
                  hello@saltfields.com
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <div>
              <p className="font-medium tracking-wider mb-3">MENU</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-gray-700">
                <Link href="/story" className="hover:text-black transition-colors">
                  STORY
                </Link>
                <Link href="/shop" className="hover:text-black transition-colors">
                  SHOP
                </Link>
                <Link href="/our-beer" className="hover:text-black transition-colors">
                  OUR BEER
                </Link>
                <Link href="/events" className="hover:text-black transition-colors">
                  EVENTS
                </Link>
                <Link href="/contact" className="hover:text-black transition-colors">
                  CONTACT
                </Link>
                <Link href="/wholesale" className="hover:text-black transition-colors">
                  WHOLESALE
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 mb-10">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sm mb-4 text-zinc-900">Stay updated with new releases and events.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white text-sm rounded-sm hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} SALTFIELDS BREWING. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="https://instagram.com/saltfieldsbrewing/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FaInstagram size={20} />
              </Link>
              <Link 
                href="https://www.twitter.com/saltfields/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FaTwitter size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}