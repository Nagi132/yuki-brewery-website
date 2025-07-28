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
    default: 'Saltfields Brewing',
    template: '%s | Saltfields Brewing',
  },
  description: 'Japanese Rice Lager and street culture merch. Authentic craft beer and apparel.',
  keywords: ['Saltfields Brewing', 'Japanese Rice Lager', 'craft beer', 'Japanese beer', 'brewery merchandise', 'lager', 'beer apparel', 'craft brewery'],
  openGraph: {
    title: 'Saltfields Brewing',
    description: 'Japanese Rice Lager and street culture merch.',
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
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon_io/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon_io/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon_io/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { rel: 'icon', url: '/favicon_io/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' },
    ],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brewery',
  name: 'Saltfields Brewing',
  url: 'https://saltfieldsbrewing.com',
  logo: 'https://saltfieldsbrewing.com/images/saltfields-logo.png',
  description: 'Virtual brewery specializing in Japanese Rice Lager with street culture aesthetic.',
  sameAs: [
    'https://www.instagram.com/saltfieldsbrewing/',
  ],
  // Virtual brewery properties
  foundingDate: '2024',
  breweryType: 'contract_brewing',
  offers: {
    '@type': 'Offer',
    itemOffered: [
      {
        '@type': 'Product',
        name: 'Japanese Rice Lager',
        brand: 'Saltfields Brewing',
        category: 'Beer'
      },
      {
        '@type': 'Product',
        name: 'Brewery Merchandise',
        brand: 'Saltfields Brewing',
        category: 'Apparel'
      }
    ]
  }
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