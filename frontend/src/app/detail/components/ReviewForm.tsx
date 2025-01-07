import { useState } from 'react';
const reviewsData = [
  {
    id: 1,
    rating: 5,
    comment: 'This is amazing product I have.',
    date: 'July 2, 2020 03:29 PM',
    user: 'Darrell Steward',
    userImage: 'https://via.placeholder.com/32',
    likes: 128,
    dislikes: 2,
  },
];
export default function ReviewForm({ detailProduct, variant }: any) {
  const [reviews, setReviews] = useState<any[]>(reviewsData); // Store all reviews
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [reviewForm, setReviewForm] = useState({
    id: null, // Unique ID for editing
    rating: 0,
    comment: '',
  });

  // Handle form field changes
  const handleReviewChange = (field: string, value: string | number) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewForm.rating === 0 || reviewForm.comment.trim() === '') {
      alert('Please provide a rating and a comment.');
      return;
    }

    if (isEditing) {
      // Update existing review
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewForm.id ? { ...r, ...reviewForm } : r))
      );
    } else {
      // Add new review
      // const newReview = {
      //   id: Date.now(),
      //   rating: reviewForm.rating,
      //   comment: reviewForm.comment,
      //   date: new Date().toLocaleString(),
      //   user: 'Your Name', // Replace with actual user data
      //   userImage: 'https://via.placeholder.com/32',
      //   likes: 0,
      //   dislikes: 0,
      // };
      const newReview = {
        productId: detailProduct.id,
        productVariantId: variant.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      };
      console.log(newReview);
      setReviews((prev) => [newReview, ...prev]);
    }

    // Reset form
    setReviewForm({ id: null, rating: 0, comment: '' });
    setIsEditing(false);
  };

  // Handle editing a review
  const handleEditReview = (review: any) => {
    setReviewForm(review);
    setIsEditing(true);
  };

  // Handle deleting a review
  const handleDeleteReview = (id: number) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <div className="bg-gray-100 p-6 ">
      {reviews.length === 0 || isEditing ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto mt-8">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {!(reviews.length === 0) ? 'Edit Your Review' : 'Write a Review'}
          </h3>

          {/* Form Section */}
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            {/* Rating Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => handleReviewChange('rating', value)}
                    className={`text-2xl transition ${
                      value <= reviewForm.rating
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Comment:
              </label>
              <textarea
                id="comment"
                value={reviewForm.comment}
                onChange={(e) => handleReviewChange('comment', e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Write your review here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                {isEditing ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Reviews
          </h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b pb-4 mb-4 last:border-none"
              >
                {/* Review Header */}
                <div className="flex items-center mb-2">
                  <img
                    src={review.userImage}
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium">{review.user}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                {/* Review Body */}
                <div className="mt-2">
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
