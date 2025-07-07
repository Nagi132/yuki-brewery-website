export async function GET(request) {
  const url = new URL(request.url);
  const isProduction = url.hostname === 'saltfieldsbrewing.com';
  
  if (isProduction) {
    return new Response(
      `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://saltfieldsbrewing.com/sitemap.xml`,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }
  
  // Block indexing for preview/development domains
  return new Response(
    `User-agent: *
Disallow: /`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}