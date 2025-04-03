// src/app/api/newsletter/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse request body
    let email;
    try {
      const body = await request.json();
      email = body.email;
      console.log("Received email for subscription:", email);
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
    
    console.log('Shopify Domain:', shopifyDomain);
    console.log('Admin API Token available:', !!adminAccessToken);
    
    if (!shopifyDomain || !adminAccessToken) {
      console.error('Missing Shopify credentials');
      return NextResponse.json(
        { success: false, message: 'Newsletter service unavailable - missing credentials' },
        { status: 500 }
      );
    }

    // First, check if the customer already exists
    try {
      console.log(`Searching for existing customer with email: ${email}`);
      const searchResponse = await fetch(
        `https://${shopifyDomain}/admin/api/2023-07/customers/search.json?query=email:${encodeURIComponent(email)}`,
        {
          headers: {
            'X-Shopify-Access-Token': adminAccessToken
          }
        }
      );
      
      const searchData = await searchResponse.json();
      console.log('Search response:', JSON.stringify(searchData));
      
      if (searchData.customers && searchData.customers.length > 0) {
        // Customer exists, update their marketing preferences
        const customerId = searchData.customers[0].id;
        console.log(`Customer exists with ID: ${customerId}, updating marketing preferences`);
        
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
        console.log('Update response:', JSON.stringify(updateData));
        
        return NextResponse.json({
          success: true, 
          message: 'Thanks for subscribing to our newsletter!'
        });
      } else {
        // Customer doesn't exist, create a new one
        console.log('Customer does not exist, creating new customer');
        
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
        console.log('Create response:', JSON.stringify(createData));
        
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