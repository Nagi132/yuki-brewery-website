// src/app/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopProgress from '@/components/ScrollToTopProgress';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://saltfieldsbrewing.com'),
  title: {
    default: 'Saltfields Brewing - Authentic Japanese Rice Lager & Merchandise',
    template: '%s | Saltfields Brewing',
  },
  description: 'Discover Saltfields Brewing, your home for authentic Japanese Rice Lager and unique brewery-themed merchandise including t-shirts, hoodies, hats, and stickers. Quality craft beer and apparel.',
  keywords: ['Saltfields Brewing', 'Japanese Rice Lager', 'craft beer', 'Japanese beer', 'brewery merchandise', 'lager', 'beer apparel', 'craft brewery'],
  openGraph: {
    title: 'Saltfields Brewing - Authentic Japanese Rice Lager & Merchandise',
    description: 'Experience the taste of Japanese Rice Lager and shop our exclusive merchandise collection at Saltfields Brewing.',
    url: 'https://saltfieldsbrewing.com',
    siteName: 'Saltfields Brewing',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Saltfields Brewing - Japanese Rice Lager and Merchandise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Twitter metadata removed as Saltfields Brewing uses Instagram primarily
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Saltfields Brewing - Authentic Japanese Rice Lager & Merchandise',
  //   description: 'Explore Saltfields Brewing for authentic Japanese Rice Lager and stylish brewery merchandise.',
  //   images: ['/twitter-image.jpg'], 
  // },
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', type: 'image/png' }, // Default Apple touch icon
      // You can add more sizes if provided by favicon_io for apple, e.g.:
      // { url: '/favicon_io/apple-touch-icon-180x180.png', type: 'image/png', sizes: '180x180' },
    ],
    other: [
      { rel: 'icon', url: '/favicon_io/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { rel: 'icon', url: '/favicon_io/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' }, 
    ],
  },
  // Verification for Google Search Console, etc.
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   other: {
  //     me: ['my-email@example.com', 'my-link-to-profile.com/me'],
  //   },
  // }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brewery', // Or 'Organization' if preferred, Brewery fits well
  name: 'Saltfields Brewing',
  url: 'https://saltfieldsbrewing.com',
  logo: 'https://saltfieldsbrewing.com/images/saltfields-logo.png', // IMPORTANT: Replace with your actual logo URL
  description: 'Saltfields Brewing specializes in authentic Japanese Rice Lager and offers a range of unique brewery-themed merchandise.',
  sameAs: [
    'https://www.instagram.com/saltfieldsbrewing/',
    // Add other social media links here if you have them (e.g., Facebook, LinkedIn)
  ],
  // If you had a physical address for the brewery (even if not public-facing for retail):
  // "address": {
  //   "@type": "PostalAddress",
  //   "streetAddress": "123 Brewery Lane",
  //   "addressLocality": "City",
  //   "addressRegion": "StateAbbreviation",
  //   "postalCode": "ZipCode",
  //   "addressCountry": "US"
  // },
  // If you have a general contact phone number:
  // "contactPoint": {
  //   "@type": "ContactPoint",
  //   "telephone": "+1-XXX-XXX-XXXX",
  //   "contactType": "Customer Service" // or "Sales", "Technical Support" etc.
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          <Navbar />
          <ScrollToTopProgress />
          {children}
          <AgeVerificationModal />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}