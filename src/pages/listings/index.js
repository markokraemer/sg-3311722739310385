import { useState } from 'react';
import Layout from '@/components/Layout';
import ListingCard from '@/components/ListingCard';
import { featuredListings } from '@/data/listings';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Select } from '@/components/ui/select';

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [filteredListings, setFilteredListings] = useState(featuredListings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setIsLoading(true);
    setError(null);
    try {
      const filtered = featuredListings.filter(listing =>
        (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (priceFilter === '' || listing.price <= parseInt(priceFilter))
      );
      setFilteredListings(filtered);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">All Listings</h1>
        <div className="mb-8 flex flex-wrap items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-auto flex-grow">
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-auto">
            <Select
              value={priceFilter}
              onValueChange={setPriceFilter}
              className="w-full"
            >
              <option value="">Price (any)</option>
              <option value="100">Up to $100</option>
              <option value="200">Up to $200</option>
              <option value="300">Up to $300</option>
              <option value="400">Up to $400</option>
              <option value="500">Up to $500</option>
            </Select>
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </Layout>
  );
}