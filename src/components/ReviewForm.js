import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Leave a Review</h3>
      <div>
        <label className="block mb-2 text-sm font-medium">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className="h-6 w-6" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block mb-2 text-sm font-medium">Comment</label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full"
          rows={4}
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  );
}