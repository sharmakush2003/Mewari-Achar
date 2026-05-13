import './globals.css';
import { Outfit, Playfair_Display, Poppins } from 'next/font/google';
import { AuthProvider } from '@/components/AuthContext';
import WhatsAppFloating from '@/components/WhatsAppFloating';


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

const poppins = Poppins({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata = {
  title: 'Mewari Special Achaar - Premium Homemade Pickles',
  description: 'Authentic homemade pickles (Achaar) made with traditional recipes and love. Order now!',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

import ClientWrapper from '@/components/ClientWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
          <AuthProvider>
            <LanguageProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
              <WhatsAppFloating />
            </LanguageProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
