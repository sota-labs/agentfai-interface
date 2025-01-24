import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Get a Whitelist for a DAO on Suidaos.com',
  description:
    'Earn a whitelist spot on suidaos.com by participating in the content creator contest, staking SHR0, or trading on RaidenX.',
  openGraph: {
    url: '/blog/opengraph-image.png',
    images: ['/blog/opengraph-image.png'],
  },
};

export default function HowToGetWhitelistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
