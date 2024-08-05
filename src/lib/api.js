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

  return featuredListings.find(listing => listing.id === parseInt(id));
};