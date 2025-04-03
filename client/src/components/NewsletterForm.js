"use client";

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Call our Admin API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      console.log('API Response:', response.status, data);
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Unable to process subscription');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <>
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-3/4 px-4 py-2 text-sm border border-r-0 border-gray-300 focus:outline-none focus:border-black"
            required
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className={`w-24 px-4 py-2 bg-black text-white text-sm transition-colors ${
              status === 'loading' ? 'opacity-70 cursor-wait' : 'hover:bg-gray-800'
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing...' : 'Sign Up'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-600 text-xs mt-2">{message}</p>
      )}
    </>
  );
}