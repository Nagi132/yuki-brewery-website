import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Setup path to .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

async function testQuery() {
  // Use your test store
  const shopifyClient = new GraphQLClient(
    `https://w0gjqw-en.myshopify.com/api/2023-07/graphql.json`,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '198e20dd3540402c924a22b413668692', // Use your token
        'Content-Type': 'application/json'
      },
    }
  );

  const query = `
  {
    product(handle: "team-t-shirt") {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            availableForSale
          }
        }
      }
    }
  }
`;

  try {
    const data = await shopifyClient.request(query);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing query:', error.response?.errors || error);
  }
}

testQuery();