export const metadata = {
  title: 'Your Shopping Cart - Saltfields Brewing',
  description: 'Review items in your shopping cart and proceed to checkout at Saltfields Brewing.',
  openGraph: {
    title: 'Shopping Cart - Saltfields Brewing',
    description: 'View your Saltfields Brewing shopping cart.',
    url: 'https://saltfieldsbrewing.com/cart',
  },
  robots: { // Typically, cart pages are not indexed
    index: false,
    follow: false, // or true if you want links from cart followed, but page not indexed
  }
};

export default function CartLayout({ children }) {
  return <>{children}</>;
} 