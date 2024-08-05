import { useState } from 'react';
import Layout from '@/components/Layout';
import ListingCard from '@/components/ListingCard';
import { featuredListings } from '@/data/listings';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState(featuredListings);

  const handleSearch = () => {
    const filtered = featuredListings.filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">All Listings</h1>
        <div className="mb-8 flex">
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </Layout>
  );
}