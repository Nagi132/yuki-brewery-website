// client/src/app/carry/page.js
"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function CarrySaltfields() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    orderType: 'partnership inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Replace these with your actual EmailJS service, template and public key
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      
      console.log('Email successfully sent!', result.text);
      setSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          businessName: '',
          name: '',
          email: '',
          phone: '',
          orderType: 'partnership inquiry',
          message: ''
        });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError('There was a problem sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold mb-12 text-center">Carry Saltfields</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
              <p className="text-zinc-700 mb-6">
                Interested in carrying Saltfields at your establishment? We're always looking to partner with businesses that share our passion for quality craft beer.
              </p>
              <p className="text-zinc-700 mb-6">
                <strong>The delivery area is limited to NYC.</strong>
              </p>
              <p className="text-zinc-700">
                Fill out the form with your information and we'll get back to you within 48 hours to discuss partnership opportunities.
              </p>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div>
            <p className="mb-4 font-medium">Contact Saltfields</p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="businessName"
                  placeholder="business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 focus:outline-none"
                />
                
                <input
                  type="text"
                  name="name"
                  placeholder="your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 focus:outline-none"
                />
                
                <input
                  type="text"
                  name="phone"
                  placeholder="phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 focus:outline-none"
                />
              </div>
              
              <select
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 focus:outline-none appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
              >
                <option value="partnership inquiry">partnership inquiry</option>
                <option value="wholesale order">wholesale order</option>
                <option value="general inquiry">general inquiry</option>
              </select>
              
              <textarea
                name="message"
                placeholder="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={10}
                className="w-full border border-gray-300 p-3 focus:outline-none resize-none"
              ></textarea>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="bg-black text-white px-8 py-2 text-sm transition-colors"
                >
                  {submitted ? 'SENT' : isSubmitting ? 'SENDING...' : 'SEND'}
                </button>
                
                {submitted && (
                  <span className="ml-4 text-green-600 text-sm">
                    Your message has been sent.
                  </span>
                )}
                
                {error && (
                  <span className="ml-4 text-black text-sm">
                    {error}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}