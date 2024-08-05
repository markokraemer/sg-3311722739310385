import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { featuredListings } from '@/data/listings';
import ReviewForm from '@/components/ReviewForm';

export default function ListingDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [reviews, setReviews] = useState([]);

  const listing = featuredListings.find(l => l.id === parseInt(id));

  if (!listing) return <div>Loading...</div>;

  const handleBooking = () => {
    router.push(`/booking-confirmation?listingId=${id}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&guests=${guests}`);
  };

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={listing.image} alt={listing.title} className="w-full h-auto rounded-lg" />
            <h1 className="text-3xl font-bold mt-4 mb-2">{listing.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{listing.location}</p>
            <p className="mb-4">Rating: {listing.rating} ({listing.reviews} reviews)</p>
            <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Wi-Fi</li>
              <li>Kitchen</li>
              <li>Free parking</li>
              <li>Air conditioning</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">House Rules</h2>
            <ul className="list-disc list-inside mb-4">
              <li>No smoking</li>
              <li>No parties or events</li>
              <li>Check-in time is 2PM - 8PM</li>
            </ul>
          </div>
          <div>
            <div className="border rounded-lg p-6 shadow-lg mb-8">
              <p className="text-2xl font-bold mb-4">${listing.price} / night</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <Input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
              </div>
              <Button className="w-full" onClick={handleBooking}>Book Now</Button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <p>Rating: {review.rating}/5</p>
                  <p>{review.comment}</p>
                </div>
              ))}
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}