export const metadata = {
  title: 'Our Beers - Saltfields Brewing',
  description: 'Discover the signature Japanese Rice Lager and other craft beers from Saltfields Brewing. Learn about our brewing process and unique flavors.',
  openGraph: {
    title: 'Our Beers - Saltfields Brewing',
    description: 'Explore the craft beer selection from Saltfields Brewing, featuring our flagship Japanese Rice Lager.',
    url: 'https://saltfieldsbrewing.com/beer', // Assuming this is the correct URL slug for this page
  },
};

export default function BeerLayout({ children }) {
  return <>{children}</>;
}
 