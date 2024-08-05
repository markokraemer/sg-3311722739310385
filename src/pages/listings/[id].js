import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { featuredListings } from '@/data/listings';
import { useState } from 'react';

export default function ListingDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [date, setDate] = useState(new Date());

  const listing = featuredListings.find(l => l.id === parseInt(id));

  if (!listing) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={listing.image} alt={listing.title} className="w-full h-auto rounded-lg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{listing.location}</p>
            <p className="text-2xl font-bold mb-4">${listing.price} / night</p>
            <p className="mb-4">Rating: {listing.rating} ({listing.reviews} reviews)</p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select dates:</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <Button className="w-full">Book Now</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}