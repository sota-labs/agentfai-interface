import '@mysten/dapp-kit/dist/index.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import './globals.css';
import { cookies } from 'next/headers';
import { AppProvider } from '@/provider';
import { Layout } from '@/components/layout';
import ToastProvider from '@/provider/ToastProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentfai.vercel.app'),
  openGraph: {
    title: 'AgentFI',
    description: 'I power the Agent Engine to help you turn intent into action.',
    siteName: 'AgentFI',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentFI Open Graph Image'
      }
    ],
  },
  title: 'AgentFI',
  description: 'I power the Agent Engine to help you turn intent into action.',
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
          <ToastProvider />
          <Layout authorization={authorization}>{children}</Layout>
        </AppProvider>
      </body>
      <GoogleAnalytics gaId="G-E8VWZLW24D" />
    </html>
  );
}
