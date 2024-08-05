import { featuredListings } from '@/data/listings';

export const fetchListings = async (searchTerm = '', priceFilter = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Filter listings based on search term and price filter
  return featuredListings.filter(listing =>
    (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (priceFilter === '' || listing.price <= parseInt(priceFilter))
  );
};

export const fetchListingById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const listing = featuredListings.find(listing => listing.id === parseInt(id));
  
  if (!listing) {
    throw new Error('Listing not found');
  }

  // Add more details to the listing object
  return {
    ...listing,
    description: "This is a beautiful and cozy place perfect for your next getaway. Enjoy stunning views and modern amenities in a prime location.",
    maxGuests: 4,
    amenities: ['Wi-Fi', 'Kitchen', 'Free parking', 'Air conditioning', 'Heating', 'Washer', 'Dryer', 'TV', 'Pool'],
    images: [
      listing.image,
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1684&q=80",
      "https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    ]
  };
};