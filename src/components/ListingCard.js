import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Star } from "lucide-react"

export default function ListingCard({ listing }) {
  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={4/3}>
        <img
          src={listing.image}
          alt={listing.title}
          className="object-cover w-full h-full"
        />
      </AspectRatio>
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
  )
}