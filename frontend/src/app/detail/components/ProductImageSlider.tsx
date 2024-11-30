'use client';

import { useState } from 'react';

export default function ProductImageSlider() {
  // Placeholder images
  const images = [
    '/placeholder1.jpg',
    '/placeholder2.jpg',
    '/placeholder3.jpg',
    '/placeholder4.jpg',
    '/placeholder5.jpg',
  ];

  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <img
          src={selectedImage}
          alt="Product Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-20 h-20 rounded-lg overflow-hidden border ${
              selectedImage === image ? 'border-green-700' : 'border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
