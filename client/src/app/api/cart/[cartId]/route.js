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

export async function GET(request, { params }) {
  const cartId = params.cartId;

  if (!cartId) {
    return NextResponse.json(
      { error: 'Cart ID is required' },
      { status: 400 }
    );
  }

  try {
    // GraphQL query to fetch a cart by ID
    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          createdAt
          updatedAt
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
      }
    `;

    const variables = {
      cartId
    };

    // Execute the query
    const data = await shopifyClient.request(query, variables);

    // If cart doesn't exist
    if (!data.cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Format the cart data
    const cart = formatCart(data.cart);

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
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