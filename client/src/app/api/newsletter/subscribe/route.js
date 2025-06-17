// src/app/api/newsletter/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse request body
    let email;
    try {
      const body = await request.json();
      email = body.email;
      // Email received for subscription
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Get Shopify credentials
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
    
    // Checking Shopify credentials
    
    if (!shopifyDomain || !adminAccessToken) {
      console.error('Missing Shopify credentials');
      return NextResponse.json(
        { success: false, message: 'Newsletter service unavailable - missing credentials' },
        { status: 500 }
      );
    }

    // First, check if the customer already exists
    try {
      // Searching for existing customer
      const searchResponse = await fetch(
        `https://${shopifyDomain}/admin/api/2023-07/customers/search.json?query=email:${encodeURIComponent(email)}`,
        {
          headers: {
            'X-Shopify-Access-Token': adminAccessToken
          }
        }
      );
      
      const searchData = await searchResponse.json();
      // Customer search completed
      
      if (searchData.customers && searchData.customers.length > 0) {
        // Customer exists, update their marketing preferences
        const customerId = searchData.customers[0].id;
        // Customer exists, updating marketing preferences
        
        const updateResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2023-07/customers/${customerId}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': adminAccessToken
            },
            body: JSON.stringify({
              customer: {
                id: customerId,
                accepts_marketing: true,
                tags: "newsletter",
                email_marketing_consent: {
                  state: "subscribed",
                  opt_in_level: "single_opt_in",
                  consent_updated_at: new Date().toISOString()
                }
              }
            })
          }
        );
        
        const updateData = await updateResponse.json();
        // Customer marketing preferences updated
        
        return NextResponse.json({
          success: true, 
          message: 'Thanks for subscribing to our newsletter!'
        });
      } else {
        // Customer doesn't exist, create a new one
        // Creating new customer
        
        const createResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2023-07/customers.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': adminAccessToken
            },
            body: JSON.stringify({
              customer: {
                email: email,
                accepts_marketing: true,
                tags: "newsletter",
                email_marketing_consent: {
                  state: "subscribed",
                  opt_in_level: "single_opt_in",
                  consent_updated_at: new Date().toISOString()
                }
              }
            })
          }
        );
        
        const createData = await createResponse.json();
        // Customer creation completed
        
        if (createResponse.ok) {
          return NextResponse.json({
            success: true,
            message: 'Thanks for subscribing to our newsletter!'
          });
        } else {
          return NextResponse.json(
            { success: false, message: 'Unable to process subscription' },
            { status: 500 }
          );
        }
      }
    } catch (apiError) {
      console.error('Shopify API call error:', apiError);
      return NextResponse.json(
        { success: false, message: 'Error contacting subscription service' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}