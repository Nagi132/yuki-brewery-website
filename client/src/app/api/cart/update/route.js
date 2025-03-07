import { NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';

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
    const { cartId, lineId, quantity } = await request.json();

    if (!cartId || !lineId) {
      return NextResponse.json(
        { error: 'Cart ID and line ID are required' },
        { status: 400 }
      );
    }

    // If quantity is 0, remove the item
    if (quantity === 0) {
      // GraphQL mutation to remove an item from the cart
      const mutation = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: [$lineIds]) {
            cart {
              id
              lines(first: 100) {
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
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId,
        lineIds: [lineId]
      };

      // Execute the mutation
      const data = await shopifyClient.request(mutation, variables);

      // Check for errors
      if (data.cartLinesRemove.userErrors.length > 0) {
        return NextResponse.json(
          { error: data.cartLinesRemove.userErrors[0].message },
          { status: 400 }
        );
      }

      // Format the cart data
      const cart = formatCart(data.cartLinesRemove.cart);

      return NextResponse.json({ cart }, { status: 200 });
    } else {
      // GraphQL mutation to update cart item quantity
      const mutation = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 100) {
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
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId,
        lines: [
          {
            id: lineId,
            quantity
          }
        ]
      };

      // Execute the mutation
      const data = await shopifyClient.request(mutation, variables);

      // Check for errors
      if (data.cartLinesUpdate.userErrors.length > 0) {
        return NextResponse.json(
          { error: data.cartLinesUpdate.userErrors[0].message },
          { status: 400 }
        );
      }

      // Format the cart data
      const cart = formatCart(data.cartLinesUpdate.cart);

      return NextResponse.json({ cart }, { status: 200 });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// Helper function to format cart data (same as in other routes)
function formatCart(shopifyCart) {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
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