import { Suspense } from 'react';
import CategoryGrid, { LoadingCategories } from '@/components/CategoryGrid';

export const metadata = {
  title: 'Shop All Collections - Saltfields Brewing',
  description: 'Browse all collections at Saltfields Brewing. Shop our exclusive Japanese Rice Lager inspired t-shirts, hoodies, hats, stickers, and more quality merchandise.',
  keywords: ['Saltfields Brewing shop', 'Saltfields Brewing merchandise', 'Japanese beer apparel', 'craft beer t-shirts', 'brewery hoodies', 'beer stickers', 'Saltfields Brewing collections'],
  openGraph: {
    title: 'Shop Saltfields Brewing Collections',
    description: 'Explore unique merchandise from Saltfields Brewing, including apparel and accessories inspired by Japanese Rice Lager.',
    url: 'https://saltfieldsbrewing.com/shop',
    images: [
      {
        url: '/og-shop-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saltfields Brewing Shop - T-shirts, Hoodies, and More',
      },
    ],
  },
  // Twitter metadata removed
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Shop Saltfields Brewing - T-Shirts, Hoodies & More',
  //   description: 'Find the latest apparel and accessories at the official Saltfields Brewing shop.',
  //   images: ['/twitter-shop-image.jpg'],
  // },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-normal text-center mb-20 mt-10">Shop Our Collections</h1>
        
        <Suspense fallback={<LoadingCategories />}>
          <CategoryGrid />
        </Suspense>
      </div>
    </div>
  );
}