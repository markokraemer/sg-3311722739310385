import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </Layout>
  );
}