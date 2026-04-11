import './globals.css';
import { Outfit, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/components/AuthContext';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Mewari Special Achaar - Premium Homemade Pickles',
  description: 'Authentic homemade pickles (Achaar) made with traditional recipes and love. Order now!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
