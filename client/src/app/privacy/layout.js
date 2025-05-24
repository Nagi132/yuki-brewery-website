export const metadata = {
  title: 'Privacy Policy - Saltfields Brewing',
  description: 'Read the Privacy Policy for Saltfields Brewing to understand how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy - Saltfields Brewing',
    description: 'Our commitment to your privacy at Saltfields Brewing.',
    url: 'https://saltfieldsbrewing.com/privacy',
  },
  robots: { // Good to ensure policy pages are indexed
    index: true,
    follow: true,
  }
};

export default function PrivacyLayout({ children }) {
  return <>{children}</>;
} 