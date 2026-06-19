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
  metadataBase: new URL('https://www.mewari-achar.shop'),
  title: 'Mewari Special Achaar - Premium Homemade Rajasthani Pickles',
  description: 'Authentic homemade Rajasthani pickles (Achaar) crafted with traditional methods, sun-dried Mathania spices, and pure mustard oil. FSSAI & MSME Certified.',
  keywords: [
    'Mewari Achaar', 'Homemade Pickles', 'Rajasthani Achaar', 
    'Mathania Mirchi Achaar', 'FSSAI Certified Pickles', 'Traditional Indian Pickles', 
    'Buy Pickles Online', 'Mewari Homemade Pickles', 'Desi Achaar', 'Mewar Special Achaar'
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: 'https://www.mewari-achar.shop',
  },
  openGraph: {
    title: 'Mewari Special Achaar - Premium Homemade Rajasthani Pickles',
    description: 'Authentic homemade Rajasthani pickles (Achaar) crafted with traditional methods, sun-dried Mathania spices, and pure mustard oil. FSSAI & MSME Certified.',
    url: 'https://www.mewari-achar.shop',
    siteName: 'Mewari Achaar',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Mewari Achaar Premium Homemade Pickles',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ClientWrapper from '@/components/ClientWrapper';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    'name': 'Mewari Achaar',
    'image': 'https://www.mewari-achar.shop/favicon.png',
    'description': 'Authentic homemade Rajasthani pickles (Achaar) crafted with traditional methods, sun-dried spices, and pure mustard oil. FSSAI & MSME Certified.',
    'url': 'https://www.mewari-achar.shop',
    'telephone': '+917014102742',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Chittorgarh',
      'addressRegion': 'Rajasthan',
      'addressCountry': 'IN'
    },
    'sameAs': [
      'https://play.google.com/store/apps/details?id=com.mewari.achaar',
      'https://wa.me/917014102742'
    ],
    'hasCredential': [
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'certification',
        'name': 'FSSAI Registration',
        'credentialId': '22226028000380'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'certification',
        'name': 'MSME Registration',
        'credentialId': 'UDYAM-RJ-10-0076393'
      }
    ]
  };

  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
