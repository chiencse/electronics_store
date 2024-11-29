import React from 'react';
import PopularSection from './PopularSection';

const categories = [
  { name: 'Electronics', products: '6.4k' },
  { name: 'Action Figure', products: '4.4k' },
  { name: 'Electronics', products: '22.3k' },
  { name: 'Gaming', products: '8.2k' },
];

const ShowProduct = () => {
  return (
    <>
      <section className=" mx-20 py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full mb-4 flex items-center justify-center">
                {/* Placeholder for category icon */}
                <i className="fas fa-box text-green-700"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.products} products
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
            View Detail
          </button>
        </div>
      </section>

      <PopularSection />
    </>
  );
};

export default ShowProduct;
