'use client';

import { useState } from 'react';
import { ReviewComment } from './ReviewComment';
import ReviewForm from './ReviewForm';

const reviewsData = {
  averageRating: 4.8,
  totalReviews: 1250,
  ratingsBreakdown: {
    5: 50,
    4: 38,
    3: 4,
    2: 4,
    1: 1,
  },
  reviews: [
    {
      id: 1,
      rating: 5,
      comment: 'This is an amazing product I have.',
      date: 'July 2, 2020 03:29 PM',
      user: 'Darrell Steward',
      userImage: 'https://via.placeholder.com/32',
      likes: 128,
      dislikes: 2,
    },
    {
      id: 2,
      rating: 5,
      comment: 'Great quality and performance!',
      date: 'July 2, 2020 01:04 PM',
      user: 'Darlene Robertson',
      userImage: 'https://via.placeholder.com/32',
      likes: 82,
      dislikes: 1,
    },
    {
      id: 3,
      rating: 4,
      comment: 'Good, but could be improved.',
      date: 'June 26, 2020 10:03 PM',
      user: 'Kathryn Murphy',
      userImage: 'https://via.placeholder.com/32',
      likes: 9,
      dislikes: 0,
    },
    {
      id: 4,
      rating: 5,
      comment: 'Exceeded my expectations!',
      date: 'June 15, 2020 12:00 PM',
      user: 'Ronald Richards',
      userImage: 'https://via.placeholder.com/32',
      likes: 45,
      dislikes: 1,
    },
    {
      id: 5,
      rating: 3,
      comment: 'It’s okay for the price.',
      date: 'June 10, 2020 09:10 AM',
      user: 'Cody Fisher',
      userImage: 'https://via.placeholder.com/32',
      likes: 8,
      dislikes: 2,
    },
    {
      id: 6,
      rating: 5,
      comment: 'Absolutely love it!',
      date: 'June 1, 2020 08:20 PM',
      user: 'Jane Cooper',
      userImage: 'https://via.placeholder.com/32',
      likes: 100,
      dislikes: 0,
    },
  ],
};

const Review = ({ detailProduct, variant }: any) => {
  const { averageRating, totalReviews, ratingsBreakdown, reviews } =
    reviewsData;

  const totalRatings = Object.values(ratingsBreakdown).reduce(
    (acc, count) => acc + count,
    0
  );

  const [filter, setFilter] = useState('all');
  const [writeReview, setWriteReview] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3); // Initial visible reviews

  const handleFilter = (type: any) => setFilter(type);

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 5); // Show 5 more reviews
  };

  return (
    <>
      {/* Review Rating */}
      <div className="bg-white shadow-md rounded-lg mt-12 p-6 mx-28">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Product Reviews
        </h2>

        <div className="flex items-center gap-6 max-w-3xl mx-auto">
          {/* Average Rating */}
          <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center w-16 h-16">
              <div className="absolute inset-0 bg-orange-100 rounded-full"></div>
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-2xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">from {totalReviews} reviews</p>
          </div>

          {/* Ratings Breakdown */}
          <div className="flex-1 space-y-2">
            {Object.entries(ratingsBreakdown)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([rating, count]) => {
                const percentage = (count / totalRatings) * 100;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm font-medium w-8 text-right">
                      {rating}.0
                    </span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-md">
                      <div
                        className="bg-green-500 h-2 rounded-md"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-sm w-10 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex gap-6 mt-6">
          {/* Filters */}
          <div className="flex flex-col gap-4 w-1/4">
            <h3 className="font-semibold text-gray-800">Reviews Filter</h3>
            <div>
              <h4 className="font-medium text-gray-700">Rating</h4>
              <div className="mt-2 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="rounded"
                      onChange={() => {}}
                    />
                    <span className="flex items-center">
                      {Array(star)
                        .fill(0)
                        .map((_, idx) => (
                          <span key={idx} className="text-yellow-500 text-sm">
                            ★
                          </span>
                        ))}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-auto">
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  !writeReview ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setWriteReview(false)}
              >
                All Reviews
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  writeReview ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setWriteReview(!writeReview)}
              >
                Write your Review
              </button>
            </div>

            {/* Reviews */}
            {!writeReview ? (
              <div className="space-y-2">
                {reviews.slice(0, visibleReviews).map((review) => (
                  <ReviewComment key={review.id} review={review} />
                ))}
                {visibleReviews < reviews.length && (
                  <button
                    onClick={handleShowMore}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Show More
                  </button>
                )}
              </div>
            ) : (
              <ReviewForm
                key={'only'}
                detailProduct={detailProduct}
                variant={variant}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
