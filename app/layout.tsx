import '@mysten/dapp-kit/dist/index.css';
import {GoogleAnalytics} from '@next/third-parties/google';
import {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import {cookies} from 'next/headers';
import {AppProvider} from '@/provider';
import {Layout} from '@/components/layout';

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
const varRoboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorization = cookies().get('Authorization')?.value || '';

  return (
    <html lang="en">
      <body className={varRoboto.variable}>
        <AppProvider>
          <ToastContainer
            autoClose={3000}
            position="top-right"
            pauseOnHover
            icon={false}
            closeButton={false}
            progressClassName="hidden"
            hideProgressBar
            toastStyle={{
              position: 'relative',
              overflow: 'visible',
              height: '100%',
              marginBottom: '0px',
              padding: '8px',
            }}
            theme="dark"
          />
          <Layout authorization={authorization}>{children}</Layout>
        </AppProvider>
      </body>
      <GoogleAnalytics gaId="G-E8VWZLW24D" />
    </html>
  );
}
