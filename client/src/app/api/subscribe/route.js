// src/app/api/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Get Shopify credentials
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    
    console.log('Shopify Domain:', shopifyDomain);
    console.log('Using Storefront API for subscription');
    
    if (!shopifyDomain || !storefrontToken) {
      console.error('Missing Shopify credentials');
      return NextResponse.json(
        { message: 'Newsletter service unavailable' },
        { status: 500 }
      );
    }
    
    // GraphQL query for customer creation with marketing consent
    const graphqlQuery = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;
    
    const variables = {
      input: {
        email: email,
        acceptsMarketing: true
      }
    };
    
    // Make the API call
    const response = await fetch(
      `https://${shopifyDomain}/api/2023-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: variables
        })
      }
    );
    
    const result = await response.json();
    console.log('Shopify API response:', JSON.stringify(result));
    
    // Check for errors
    if (result.errors || (result.data?.customerCreate?.customerUserErrors?.length > 0)) {
      const errors = result.errors || result.data.customerCreate.customerUserErrors;
      
      // Check for duplicate email
      if (JSON.stringify(errors).includes('Email has already been taken')) {
        return NextResponse.json({
          success: true,
          message: 'You\'re already subscribed!'
        });
      }
      
      console.error('Shopify API errors:', errors);
      return NextResponse.json(
        { message: 'Unable to process subscription' },
        { status: 500 }
      );
    }
    
    console.log('Successfully added subscriber:', email);
    
    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!'
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}