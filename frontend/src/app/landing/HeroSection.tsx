import React from 'react';
// import GeneriCoverImage from './assets/generic1.png';

const HeroSection = () => {
  return (
    <section className="px-8 py-12 bg-white flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left pl-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Upgrade Your Wardrobe With Our Collection
        </h1>

        <p className="text-gray-600 mb-6 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
          Egst neque senectus vivamus aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusc...
        </p>
        <div className="flex justify-center lg:justify-start space-x-4">
          <button className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
            Buy Now
          </button>
          <button className="border border-green-700 text-green-700 px-6 py-2 rounded-md font-semibold">
            View Detail
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-start">
        {/* Placeholder for the image */}
        <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg grow bg-[url('./assets/generic1.png')]">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;