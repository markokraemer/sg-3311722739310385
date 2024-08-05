import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import ReviewForm from '@/components/ReviewForm';
import { fetchListingById } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, User, Home, Shield } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import ListingMap from '@/components/ListingMap';
import dynamic from 'next/dynamic';

// Dynamically import ListingMap with no SSR to avoid leaflet issues
const DynamicListingMap = dynamic(() => import('@/components/ListingMap'), {
  ssr: false,
});

export default function ListingDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchListingById(parseInt(id))
        .then(data => {
          setListing(data);
          setIsLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch listing details');
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleBooking = () => {
    router.push(`/booking-confirmation?listingId=${id}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&guests=${guests}`);
  };

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-xl text-gray-600">{listing.location}</p>
            </div>
            <div className="mb-6">
              <PhotoGallery images={listing.images || [listing.image]} />
            </div>
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                    <p className="mb-4">{listing.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-2" />
                        <span>Entire home</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        <span>Up to {listing.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        <span>Enhanced Clean</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="amenities">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {listing.amenities && listing.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Badge variant="outline" className="mr-2">{amenity}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-bold mr-2">{listing.rating}</span>
                      <span className="text-gray-600">({listing.reviews} reviews)</span>
                    </div>
                    {reviews.map((review, index) => (
                      <div key={index} className="mb-4 p-4 border rounded">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-bold">{review.rating}/5</span>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                    <ReviewForm onSubmit={handleReviewSubmit} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="location">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Location</h2>
                    <DynamicListingMap coordinates={listing.coordinates} location={listing.location} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold">${listing.price} <span className="text-base font-normal text-gray-600">/ night</span></p>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-bold">{listing.rating}</span>
                  </div>
                </div>
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
                    max={listing.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
                <Button className="w-full" onClick={handleBooking}>Book Now</Button>
                <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}