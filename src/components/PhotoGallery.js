import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <img src={images[0]} alt="Main" className="w-full h-96 object-cover rounded-lg" />
        </div>
        {images.slice(1, 5).map((image, index) => (
          <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-2">View all photos</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img src={images[currentIndex]} alt={`Photo ${currentIndex + 1}`} className="w-full h-auto" />
            <Button variant="outline" className="absolute top-1/2 left-4 transform -translate-y-1/2" onClick={prevImage}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={nextImage}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}