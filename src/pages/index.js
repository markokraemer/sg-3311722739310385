import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { featuredListings } from '@/data/listings';

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
        <h2 className="text-3xl font-bold mb-8">Featured Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </Layout>
  );
}