"use client";

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

            <ContactForm
              variant="default"
              fields={["name", "email", "message"]}
              nameLastNameGrid={true}
              buttonText="Send"
              hideAfterSubmit={false}
              className="w-full"
              formClassName="space-y-3"
              inputClassName="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
              textareaRows={7}
              buttonWrapperClassName="flex justify-start"
              buttonClassName="px-8 py-2 bg-black text-white text-sm transition-colors hover:bg-gray-800"
              placeholders={{
                name: "First Name",
                lastName: "Last Name",
                email: "Your email",
                message: "Your message"
              }}
              successMessage="Thank you for your message! We'll be in touch soon."
              errorMessage="Failed to send message. Please try again."
            />
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
              {/* <div>
                <Link href="/carry" className="hover:text-black transition-colors">
                  CARRY SALTFIELDS
                </Link>
              </div> */}
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
                  href="mailto:yumi@saltfields.com"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </Link>
              </div>
            </div>

            {/* Newsletter Section - using our custom NewsletterForm component */}
            <div>
              <p className="font-medium tracking-wider mb-2">NEWSLETTER</p>
              <p className="text-sm mb-4 text-gray-700">Stay updated with new releases and events.</p>
              
              {/* Replace the old form with our new component */}
              <NewsletterForm />
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