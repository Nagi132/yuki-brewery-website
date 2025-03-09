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
      <div className="container mx-auto px-4 py-16 max-w-5xl mt-8">
        <h1 className="text-4xl text-center font-normal">Carry Saltfields</h1>
        <p className="text-center mb-20">The delivery area is limited to NYC.</p>
        
        <div className="mb-8">
          <p className="mb-4">Contact Saltfields</p>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 focus:outline-none"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 focus:outline-none"
              />
              
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 focus:outline-none"
              />
            </div>
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 focus:outline-none"
            />
            
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              className="w-full border border-gray-300 p-3 focus:outline-none resize-none"
            ></textarea>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="bg-black text-white px-8 py-2 text-sm transition-colors"
              >
                {submitted ? 'SENT' : isSubmitting ? 'SENDING...' : 'Send'}
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
    </main>
  );
}