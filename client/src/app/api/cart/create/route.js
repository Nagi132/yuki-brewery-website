import { NextResponse } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';

// Set up GraphQL client for Shopify
const shopifyClient = new GraphQLClient(
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  }
);

export async function POST(request) {
  try {
    // Get items from request body if present
    const { items } = await request.json().catch(() => ({ items: [] }));

    // GraphQL mutation to create a cart
    let mutation;
    let variables = {};

    if (items && items.length > 0) {
      // Create cart with items
      mutation = gql`
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 20) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                          handle
                        }
                        image {
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
              checkoutUrl
            }
          }
        }
      `;

      // Prepare cart lines for Shopify
      const lines = items.map(item => ({
        quantity: item.quantity,
        merchandiseId: item.variantId
      }));

      variables = {
        input: {
          lines: lines
        }
      };
    } else {
      // Create empty cart
      mutation = gql`
        mutation cartCreate {
          cartCreate {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                          handle
                        }
                        image {
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
              }
              checkoutUrl
            }
          }
        }
      `;
    }

    // Execute the mutation
    const data = await shopifyClient.request(mutation, variables);
    
    // Get cart data from response
    const cartData = items.length > 0 
      ? data.cartCreate.cart
      : data.cartCreate.cart;

    // Format the cart data for easier consumption
    const cart = formatCart(cartData);

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}

// Helper function to format cart data
function formatCart(shopifyCart) {
  // Get the base URL for your Next.js app - fallback to localhost for development
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  // Add return_to parameter to the checkout URL to redirect after completion
  let checkoutUrl = shopifyCart.checkoutUrl;
  if (checkoutUrl) {
    // Determine if we need to add a ? or & character
    const separator = checkoutUrl.includes('?') ? '&' : '?';
    
    // Add the return_to parameter to redirect after checkout
    const returnUrl = `${appUrl}/thank-you`;
    checkoutUrl = `${checkoutUrl}${separator}return_to=${encodeURIComponent(returnUrl)}`;
    
    // Checkout URL configured with redirect
  }
  
  return {
    id: shopifyCart.id,
    checkoutUrl: checkoutUrl,
    lines: shopifyCart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      handle: node.merchandise.product.handle,
      image: node.merchandise.image?.url,
      price: parseFloat(node.merchandise.price.amount),
      variantId: node.merchandise.id
    })),
    subtotal: parseFloat(shopifyCart.estimatedCost.subtotalAmount.amount),
    tax: shopifyCart.estimatedCost.totalTaxAmount?.amount 
      ? parseFloat(shopifyCart.estimatedCost.totalTaxAmount.amount) 
      : 0,
    total: parseFloat(shopifyCart.estimatedCost.totalAmount.amount)
  };
}