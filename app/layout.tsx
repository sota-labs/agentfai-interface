import { Layout } from '@/components/layout';
import '@mysten/dapp-kit/dist/index.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://suidaos.com'),
  openGraph: {
    title: 'Sui DAOs',
    description:
      'Raise money, trade AI. The best hedge fund manager on SUI by raidenx.io',
    siteName: 'Sui DAOs',
    images: [
      {
        url: '/logo/opengraph-image.jpg',
        alt: 'Sui DAOs',
      },
    ],
  },
  title: 'Sui DAOs',
  description:
    'Raise money, trade AI. The best hedge fund manager on SUI by raidenx.io',
  icons: {
    icon: '/logo/logo-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          autoClose={2000}
          position="top-right"
          icon={false}
          pauseOnHover
          closeButton={false}
          hideProgressBar
          toastStyle={{
            position: 'relative',
            overflow: 'visible',
          }}
        />
        <Layout>{children}</Layout>
      </body>
      <GoogleAnalytics gaId="G-E8VWZLW24D" />
    </html>
  );
}
