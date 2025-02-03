
import { Layout } from '@/components/layout';
import { cookies } from 'next/headers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorization = cookies().get('Authorization')?.value || '';
  console.log('authorization', authorization);
  return (
    <Layout authorization={authorization}>{children}</Layout>
  );
}
