import React from 'react';

export const ReviewComment = ({ review }: any) => {
  return (
    <div>
      <div
        key={review.id}
        className="p-4 border rounded-md flex gap-4 items-start"
      >
        <img
          src={review.userImage}
          alt={review.user}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center gap-2">
            {Array(review.rating)
              .fill(0)
              .map((_, idx) => (
                <span key={idx} className="text-yellow-500 text-sm">
                  ★
                </span>
              ))}
          </div>
          <p className="text-gray-800 mt-2">{review.comment}</p>
          <p className="text-gray-500 text-sm mt-1">{review.date}</p>
          <p className="text-gray-800 font-medium mt-2">{review.user}</p>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <button className="flex items-center gap-1 text-gray-500">
            <span>👍</span>
            {review.likes}
          </button>
          <button className="flex items-center gap-1 text-gray-500">
            <span>👎</span>
            {review.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};
