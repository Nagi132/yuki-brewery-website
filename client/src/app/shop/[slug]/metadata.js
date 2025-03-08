// File path: client/src/app/shop/[slug]/metadata.js
// Separate metadata generator function

export async function generateMetadata({ params }) {
    // Properly await the params
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // You could fetch product data here to generate metadata
    // For now, use a simplified approach
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} | Saltfields Brewing`,
      description: `Shop our ${slug.replace(/-/g, ' ')} and other merchandise from Saltfields Brewing.`
    };
  }