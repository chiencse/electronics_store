import React from 'react';
import Image from 'next/image';
const HeroSection = () => {
  return (
    <section className="px-8 py-12 bg-gradient-to-r from-green-100 via-white to-green-100 flex flex-col lg:flex-row items-center justify-between">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left pl-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Upgrade Your Lifestyle With Cutting-Edge Electronics
        </h1>
        <p className="text-gray-700 mb-6 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
          Discover the latest gadgets and devices that make life smarter, faster, and more enjoyable. From phones to home appliances, we have everything you need.
        </p>
        <div className="flex justify-center lg:justify-start space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition-all duration-300">
            Shop Now
          </button>
          <button className="border border-green-600 hover:border-green-700 text-green-600 hover:text-green-700 px-6 py-3 rounded-md font-semibold shadow-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-start">
        <div
          className="w-full bg-cover bg-center bg-gray-200 rounded-lg shadow-lg"
          
        >
         <Image src="/ipad-pro-m4-13-inch-wifi-256gb.jpg" alt="hero"  width={1000}
                  height={1500}
                  className="rounded-lg "/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

