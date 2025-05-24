// client/src/app/terms/page.js
"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-medium text-center mb-16">Terms of Service</h1>
        
        <div className="space-y-6">
          <p>
            Welcome to Saltfields Brewing. By accessing this website, you agree to comply with and be bound by the following terms and 
            conditions of use. Please review these terms carefully before using our website.
          </p>

          <p className="font-medium mt-10 mb-4">Age Restriction</p>
          <p>
            Saltfields Brewing products are intended for purchase and consumption only by persons who are of legal drinking age 
            (21 years or older in the United States). By using this website, you represent and warrant that you are of legal drinking age 
            in your jurisdiction of residence. We reserve the right to verify your age and to refuse service to anyone who cannot verify 
            their age.
          </p>

          <p className="font-medium mt-10 mb-4">Use of Website</p>
          <p>
            The content of the pages of this website is for your general information and use only. It is subject to change without notice.
            You agree to use our website only for lawful purposes and in a manner that does not infringe upon or restrict anyone else's use of the website.
          </p>
          
          <p>
            Prohibited uses include using the website in any way that breaches applicable local, national, or international laws or regulations, 
            using the website in any way that is unlawful or fraudulent, transmitting any material that is defamatory, offensive, or otherwise 
            objectionable, attempting to gain unauthorized access to our website, the server on which our website is stored, or any server, 
            computer, or database connected to our website.
          </p>

          <p className="font-medium mt-10 mb-4">Intellectual Property</p>
          <p>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, 
            layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which 
            forms part of these terms and conditions. All trademarks reproduced in this website which are not the property of, or licensed to, 
            the operator are acknowledged on the website.
          </p>

          <p className="font-medium mt-10 mb-4">E-Commerce Terms</p>
          <p>
            By placing an order through our website, you are offering to purchase a product on and subject to the following terms and conditions:
            All orders are subject to availability and confirmation of the order price. We reserve the right to refuse any order you place with us.
            When you place an order, you will receive an acknowledgement e-mail confirming receipt of your order. This email will only be an 
            acknowledgement and will not constitute acceptance of your order. A contract between us will not be formed until we send you 
            confirmation by e-mail that the goods which you ordered have been dispatched to you. Prices are subject to change without notice.
          </p>

          <p className="font-medium mt-10 mb-4">User Account</p>
          <p>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password 
            and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account. 
            You should take all necessary steps to ensure that the password is kept confidential and secure. In the event that you have any 
            concerns regarding your password or become aware of any breach of security, you should inform us immediately.
          </p>

          <p className="font-medium mt-10 mb-4">Limitation of Liability</p>
          <p>
            While we endeavor to ensure that the information on this website is correct, we do not warrant its completeness or accuracy. 
            We do not warrant that the website will be available at all times or that your use of the website will be uninterrupted, timely, 
            secure or error-free. We will not be liable for any losses or damage that you may suffer as a result of using our website.
          </p>

          <p className="font-medium mt-10 mb-4">Governing Law</p>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the State of New York, and any disputes 
            relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of New York.
          </p>

          <p className="font-medium mt-10 mb-4">Changes to Terms</p>
          <p>
            We may revise these terms of use at any time by amending this page. Please check this page regularly to take notice of any changes 
            we made, as they are binding on you. Some of the provisions contained in these terms of use may also be superseded by provisions or 
            notices published elsewhere on our website.
          </p>

          <p className="mt-10">
            Please contact us with any questions or concerns at yumi@saltfields.com.
          </p>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/privacy" className="text-black hover:underline">
            View our Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}