// client/src/app/returns/page.js
"use client";

import React from 'react';
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 mt-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-16">Returns Policy</h1>
        
        <div className="space-y-6">
          <p>
            At Saltfields Brewing, we take pride in the quality of our products. We offer returns and exchanges only for items that are defective or damaged upon arrival.
          </p>

          <p className="font-medium mt-10 mb-4">Return Eligibility</p>
          <p>
            To be eligible for a return, your item must be defective or damaged upon arrival. Returns must be requested within 7 days of the purchase date. 
            Original packaging should be included when possible, and proof of purchase is required for all returns.
          </p>

          <p className="font-medium mt-10 mb-4">Shipping</p>
          <p>
            Free domestic shipping is available on orders over $150. When a return is approved for a defective or damaged item, 
            return shipping costs will be covered by Saltfields Brewing.
          </p>

          <p className="font-medium mt-10 mb-4">Return Process</p>
          <p>
            1. Document the Damage: Take clear photos of the defective or damaged item, showing the issue in detail.
          </p>
          
          <p>
            2. Contact Customer Service: Email our team at info@saltfieldsbrewing.com with your order number, description of the issue, 
            photos of the damaged/defective item, and your contact information.
          </p>
          
          <p>
            3. Receive Return Authorization: Our team will review your request and provide return instructions, 
            including a return shipping label if the return is approved.
          </p>
          
          <p>
            4. Complete Your Return: Package the item securely and ship it back using the provided instructions. 
            Once received and inspected, we'll process your refund or send a replacement.
          </p>

          <p className="font-medium mt-10 mb-4">Frequently Asked Questions</p>
          
          <p className="font-medium mb-2">How long will it take to process my return?</p>
          <p className="mb-4">
            Once we receive your returned item, we'll inspect it and process your refund or replacement within 3-5 business days. 
            Refunds typically appear in your account within 5-10 business days, depending on your payment provider.
          </p>
          
          <p className="font-medium mb-2">Can I return merchandise that doesn't fit or I simply don't like?</p>
          <p className="mb-4">
            No, we only accept returns for items that are defective or damaged upon arrival. 
            We recommend reviewing our size charts and product descriptions carefully before making a purchase.
          </p>
          
          <p className="font-medium mb-2">Do you offer exchanges?</p>
          <p className="mb-4">
            Yes, for defective or damaged items, you can request an exchange for the same item in the same size/color. 
            If you'd prefer a different size or item, we'll issue a refund once we receive the return, and you can place a new order.
          </p>
          
          <p className="font-medium mb-2">What if my item arrives damaged during shipping?</p>
          <p className="mb-4">
            Please take photos of both the damaged item and the packaging, and contact us within 48 hours of delivery. 
            We'll work with our shipping partners to resolve the issue promptly.
          </p>

          <p className="font-medium mt-10 mb-4">Contact Us</p>
          <p>
            If you have any questions about our returns policy, please contact us at info@saltfieldsbrewing.com.
          </p>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/shop" className="text-black hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}