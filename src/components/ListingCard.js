import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star, Heart } from "lucide-react"
import Link from 'next/link'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ListingCard({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
        <Link href={`/listings/${listing.id}`}>
          <AspectRatio ratio={4/3}>
            <img
              src={listing.image}
              alt={listing.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </Link>
        <motion.button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
        </motion.button>
        <CardContent className="p-4">
          <Link href={`/listings/${listing.id}`}>
            <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{listing.location}</p>
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({listing.reviews} reviews)</span>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-bold">${listing.price} <span className="text-sm font-normal">/ night</span></p>
          <Link href={`/listings/${listing.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}