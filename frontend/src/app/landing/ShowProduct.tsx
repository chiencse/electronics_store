import React from 'react';
import PopularSection from './PopularSection';
import {
  faBars,
  faCartShopping,
  faCarTunnel,
  faHamburger,
  faMagnifyingGlass,
  faPerson,
  faUser,
  faMobileAlt,
  faLaptop,
  faHeadphones,
  faStopwatch,
  faHome,
  faKeyboard,
  faTv,
  faRecycle,
  faTags,
  faNewspaper,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categories = [
  { name: 'Phone, Tablet', icon: faMobileAlt, productCount: '6.4k' },
  { name: 'Laptop', icon: faLaptop, productCount: '4.2k' },
  { name: 'Audio', icon: faHeadphones, productCount: '3.1k' },
  { name: 'Watches, Camera', icon: faCamera, productCount: '2.7k' },
  { name: 'Home Appliances', icon: faHome, productCount: '5.3k' },
  { name: 'Accessories', icon: faKeyboard, productCount: '8.1k' },
  { name: 'PC, Monitors, Printers', icon: faLaptop, productCount: '1.9k' },
  { name: 'TV', icon: faTv, productCount: '3.8k' },
  { name: 'Trade-In Deals', icon: faRecycle, productCount: '750' },
  { name: 'Used Goods', icon: faTags, productCount: '1.2k' },
  { name: 'Promotions', icon: faTags, productCount: '4.8k' },
  { name: 'Tech News', icon: faNewspaper, productCount: '9.4k' },
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
        <div className="flex overflow-x-auto gap-4 p-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center min-w-[200px]"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full mb-4 flex items-center justify-center">
                <i className="text-green-700">
                  <FontAwesomeIcon icon={category.icon} />
                </i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.productCount} products
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
