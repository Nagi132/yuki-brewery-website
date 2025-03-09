// src/components/NewsletterForm.js
"use client";

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Create a form that submits directly to Shopify
      const form = document.createElement('form');
      form.method = 'post';
      form.action = `https://${storeDomain}/contact#contact_form`;
      form.style.display = 'none';
      
      // Form fields
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.name = 'contact[email]';
      emailInput.value = email;
      
      const messageInput = document.createElement('input');
      messageInput.type = 'hidden';
      messageInput.name = 'contact[body]';
      messageInput.value = 'Newsletter signup';
      
      const formTypeInput = document.createElement('input');
      formTypeInput.type = 'hidden';
      formTypeInput.name = 'form_type';
      formTypeInput.value = 'customer';
      
      const utf8Input = document.createElement('input');
      utf8Input.type = 'hidden';
      utf8Input.name = 'utf8';
      utf8Input.value = '✓';
      
      // Add fields to form
      form.appendChild(emailInput);
      form.appendChild(messageInput);
      form.appendChild(formTypeInput);
      form.appendChild(utf8Input);
      
      // Add to page
      document.body.appendChild(form);
      
      // Submit in background with fetch instead of redirecting
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'text/html,application/xhtml+xml'
        },
        mode: 'no-cors' // Important! This bypasses CORS issues
      });
      
      // Remove form
      document.body.removeChild(form);
      
      // Show success even with no-cors (we won't get response data)
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
      
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-sm mb-4 text-zinc-900">Stay updated with new releases and events.</p>
      
      {status === 'success' ? (
        <div className="text-green-600 py-2 border border-green-200 bg-green-50 rounded-sm px-4">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-black"
            required
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-black text-white text-sm rounded-sm transition-colors ${
              status === 'loading' ? 'opacity-70 cursor-wait' : 'hover:bg-gray-800'
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="text-red-600 text-xs mt-2">{message}</p>
      )}
    </div>
  );
}