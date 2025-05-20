// src/app/layout.js
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopProgress from '@/components/ScrollToTopProgress';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata = {
  title: 'Saltfields Brewing',
  description: 'Craft beer meets street culture',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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