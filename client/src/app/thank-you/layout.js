export const metadata = {
  title: 'Thank You! - Saltfields Brewing',
  description: 'Thank you for your order from Saltfields Brewing. We appreciate your business.',
  openGraph: {
    title: 'Order Confirmation - Saltfields Brewing',
    description: 'Your Saltfields Brewing order has been successfully placed.',
    url: 'https://saltfieldsbrewing.com/thank-you',
  },
  robots: { // Thank you pages are usually not indexed
    index: false,
    follow: false, 
  }
};

export default function ThankYouLayout({ children }) {
  return <>{children}</>;
} 