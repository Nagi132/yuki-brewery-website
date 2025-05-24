export const metadata = {
  title: 'Find Saltfields Brewing Beer - Locations & Stockists',
  description: 'Discover where to find and enjoy Saltfields Brewing\'s authentic Japanese Rice Lager. Locate bars, restaurants, and retail partners near you.',
  keywords: ['Saltfields Brewing locations', 'find Saltfields Brewing beer', 'Japanese Rice Lager stockists', 'beer finder', 'where to buy Saltfields Brewing'],
  openGraph: {
    title: 'Find Saltfields Brewing Beer',
    description: 'Locate stockists of Saltfields Brewing\'s Japanese Rice Lager.',
    url: 'https://saltfieldsbrewing.com/find-us',
    images: [
      {
        url: '/og-find-us-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Map showing Saltfields Brewing beer locations',
      },
    ],
  },
  // Twitter metadata removed
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Where to Find Saltfields Brewing Beer',
  //   description: 'Use our map to find Saltfields Brewing Japanese Rice Lager near you.',
  //   images: ['/twitter-find-us-image.jpg'],
  // },
};

export default function FindUsLayout({ children }) {
  return <>{children}</>;
} 