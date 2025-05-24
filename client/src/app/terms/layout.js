export const metadata = {
  title: 'Terms of Service - Saltfields Brewing',
  description: 'Read the Terms of Service for Saltfields Brewing. Understand the conditions of using our website and purchasing our products.',
  openGraph: {
    title: 'Terms of Service - Saltfields Brewing',
    description: 'Our terms and conditions for Saltfields Brewing.',
    url: 'https://saltfieldsbrewing.com/terms',
  },
  robots: { // Good to ensure policy pages are indexed
    index: true,
    follow: true,
  }
};

export default function TermsLayout({ children }) {
  return <>{children}</>;
} 