
import { Layout } from '@/components/layout';
import { cookies } from 'next/headers';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorization = cookies().get('Authorization')?.value || '';
  return (
    <Layout authorization={authorization}>{children}</Layout>
  );
}
