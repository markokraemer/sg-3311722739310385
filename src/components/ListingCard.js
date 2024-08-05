import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star, Heart } from "lucide-react"
import Link from 'next/link'

export default function ListingCard({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
        <AspectRatio ratio={4/3}>
          <img
            src={listing.image}
            alt={listing.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
        </button>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{listing.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({listing.reviews} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-lg font-bold">${listing.price} <span className="text-sm font-normal">/ night</span></p>
        </CardFooter>
      </Card>
    </Link>
  )
}