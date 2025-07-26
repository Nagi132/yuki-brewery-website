// client/src/app/privacy/page.js
"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 mt-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-16">Privacy Policy</h1>
        
        <div className="space-y-6">
          <p>
            This privacy policy sets out how Saltfields Brewing uses and protects any information you give Saltfields Brewing when using this website. Saltfields Brewing is committed to ensuring that your privacy is protected. Should we ask you to provide information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.
          </p>

          <p className="font-medium mt-10 mb-4">We may collect the following information:</p>
          
          <p>
            Saltfields Brewing collects personal information when you shop and register with us. When you place an order with us, we may ask for your name, email address, phone number, billing address, shipping address, and credit card number. We use this information to fulfill our order and to communicate with you about it.
          </p>

          <p className="font-medium mt-10 mb-4">Ways Saltfields Brewing may use your information:</p>
          
          <p>To fulfill the orders.</p>
          
          <p>Internal record keeping.</p>
          
          <p>
            We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.
          </p>
          
          <p>We do not release any information about you to other companies.</p>
          
          <p>
            Saltfields Brewing is committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We use the Secure Socket Layer (SSL) protocol to protect the security of your online order information as it is transmitted to our server. SSL technology encrypts your information to protect it from being deciphered by anyone other than Saltfields Brewing.
          </p>
          
          <p>
            We use cookies to provide you with a better experience. A cookie is a small file which is placed on your computer's hard drive. The cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual.
          </p>
          
          <p className="font-medium mt-10 mb-4">Third-Party Services:</p>
          
          <p>
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline">Terms of Service</a> apply.
          </p>
          
          <p>
            Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.
          </p>
          
          <p>
            You may choose to restrict the collection or use of your personal information by contacting us directly. We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.
          </p>
          
          <p>
            We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
          </p>
          
          <p className="mt-10">
            Please contact us with any questions or concerns at info@saltfieldsbrewing.com.
          </p>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/terms" className="text-black hover:underline">
            View our Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
}