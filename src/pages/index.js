import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { featuredListings } from '@/data/listings';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-6">Find your next stay</h1>
          <p className="text-xl mb-8">Search low prices on homes, apartments, and much more...</p>
          <div className="flex items-center bg-white rounded-full p-2 max-w-2xl">
            <Input
              type="text"
              placeholder="Where are you going?"
              className="flex-grow border-none focus:ring-0"
            />
            <Button size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Listings</h2>
          <Link href="/listings" className="text-primary hover:underline">
            View all listings
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p>Choose from millions of unique homes and experiences.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p>Find great deals and special offers on accommodations.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Our customer support team is always here to help.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}