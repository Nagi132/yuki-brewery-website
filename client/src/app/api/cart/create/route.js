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

export async function POST() {
  try {
    // GraphQL mutation to create a cart
    const mutation = `
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

    // Execute the mutation
    const data = await shopifyClient.request(mutation);

    // Format the cart data for easier consumption
    const cart = formatCart(data.cartCreate.cart);

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