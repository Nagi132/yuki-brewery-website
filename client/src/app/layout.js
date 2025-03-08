import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopProgress from '@/components/ScrollToTopProgress';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Saltfields Brewing',
  description: 'Craft beer meets street culture',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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