"use client";

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-off-white relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0),
            radial-gradient(circle at 1px 1px, #000 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-wide text-zinc-900 mb-4">CONTACT US</h1>
            <p className="text-zinc-700 max-w-2xl mx-auto text-lg">
              Questions about our beer? Want to stock Saltfields? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 border border-black/5">
                <h2 className="text-xl font-bold tracking-wide text-zinc-900 mb-6">
                  GET IN TOUCH
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-amber-500 text-xl mt-1" />
                    <div>
                      <p className="font-medium text-zinc-900">VISIT US</p>
                      <p className="text-zinc-700">43 CANAL STREET</p>
                      <p className="text-zinc-700">NEW YORK, NY 10002</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaPhone className="text-amber-500 text-xl" />
                    <div>
                      <p className="font-medium text-zinc-900">CALL US</p>
                      <p className="text-zinc-700">(212) 226-2545</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-amber-500 text-xl" />
                    <div>
                      <p className="font-medium text-zinc-900">EMAIL US</p>
                      <p className="text-zinc-700">hello@saltfields.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaClock className="text-amber-500 text-xl mt-1" />
                    <div>
                      <p className="font-medium text-zinc-900">HOURS</p>
                      <p className="text-zinc-700">MON-THU: 11AM - 10PM</p>
                      <p className="text-zinc-700">FRI-SAT: 11AM - 11PM</p>
                      <p className="text-zinc-700">SUN: 12PM - 8PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map or Image */}
              <div className="bg-white/80 backdrop-blur-sm aspect-video rounded-lg border border-black/5">
                {/* Add your map or location image here */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 border border-black/5">
              <h2 className="text-xl font-bold tracking-wide text-zinc-900 mb-6">
                SEND US A MESSAGE
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-zinc-900 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-900 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 bg-white border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-900 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-zinc-900 text-white px-6 py-3 rounded-md font-medium tracking-wide hover:bg-zinc-800 transition-colors duration-300"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}