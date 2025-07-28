export const metadata = {
  title: 'Find Our Beer',
  description: 'Where to find Saltfields Brewing Japanese Rice Lager. Interactive map of bars, restaurants, and retailers.',
  keywords: ['Saltfields Brewing locations', 'find Saltfields beer', 'Japanese Rice Lager', 'beer finder', 'where to buy'],
  openGraph: {
    title: 'Find Our Beer',
    description: 'Where to find Saltfields Brewing Japanese Rice Lager.',
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