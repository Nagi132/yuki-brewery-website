// client/src/app/carry/page.js
"use client";

import React from 'react';
import ContactForm from '@/components/ContactForm';

export default function CarrySaltfields() {
  return (
    <main className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl mt-8">
        <h1 className="text-3xl text-center font-normal">Carry Saltfields</h1>
        <p className="text-center mb-20">The delivery area is limited to NYC.</p>
        
        <div className="mb-8">
          <p className="mb-4">Contact Saltfields</p>
          
          <ContactForm
            fields={["name", "email", "message"]}
            extraFields={{
              businessName: {
                placeholder: "Business Name",
                required: true
              },
              orderType: {
                type: "hidden",
                value: "partnership inquiry"
              }
            }}
            nameLastNameGrid={true}
            placeholders={{
              name: "First Name",
              lastName: "Last Name",
              email: "Email",
              message: "Message"
            }}
            inputClassName="w-full border border-gray-300 p-3 focus:outline-none"
            textareaRows={8}
            buttonClassName="bg-black text-white px-8 py-2 text-sm transition-colors"
            formClassName="space-y-4"
            hideAfterSubmit={false}
            successMessage="Your message has been sent."
            errorMessage="There was a problem sending your message. Please try again."
          />
        </div>
      </div>
    </main>
  );
}