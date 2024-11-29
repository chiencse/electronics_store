'use client';

import React, { useState } from 'react';
import ContainProduct from './components/containProduct';

const products = [
  {
    id: 1,
    name: 'Spy x Family Tshirt',
    price: '26',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 2,
    name: 'Green Man Jacket',
    price: '49',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 3,
    name: 'Iphone 14 Pro Max',
    price: '1200',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 4,
    name: 'Oversized Tshirt',
    price: '48',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 5,
    name: 'Brown Woman Hoodie',
    price: '49',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 6,
    name: 'Airpod Pro 2022',
    price: '459',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 7,
    name: 'DJI Mini 3 Pro',
    price: '842',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
  {
    id: 8,
    name: 'Ipad Pro Gen 3',
    price: '338',
    rating: 4.8,
    sold: 1238,
    location: 'North Purwokerto',
    image:
      'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp',
  },
];

const FilterPanel = ({ filters, handleFilterPress, onFilterChange }: any) => {
  return (
    <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-6 mr-12">
      {/* Category Filter */}
      <div className="flex flex-col w-full">
        <label className="text-gray-700 font-medium mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Gaming">Gaming</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div className="flex flex-col w-full">
        <label className="text-gray-700 font-medium mb-1">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Sony">Sony</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col w-full">
        <label className="text-gray-700 font-medium mb-1">Price Range</label>
        <div className="flex items-center space-x-2">
          <input
            value={filters.priceRange[0]}
            onChange={(e) =>
              onFilterChange('priceRange', [
                +e.target.value,
                filters.priceRange[1],
              ])
            }
            inputMode="numeric"
            className="p-2 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange('priceRange', [
                filters.priceRange[0],
                +e.target.value,
              ])
            }
            inputMode="numeric"
            className="p-2 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col w-full">
        <label className="text-gray-700 font-medium mb-1">Rating</label>
        <input
          type="number"
          value={filters.rating}
          onChange={(e) => onFilterChange('rating', +e.target.value)}
          className="p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          min="0"
          max="5"
          placeholder="0 - 5"
        />
      </div>

      {/* Find Button */}
      <div className="flex items-end">
        <button
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition-colors duration-300"
          onClick={() => handleFilterPress()}
        >
          Find
        </button>
      </div>
    </div>
  );
};

const FeaturedProduct = ({ product }: any) => {
  return (
    <div className="mt-12 bg-gray-50 p-8 rounded-lg flex flex-col lg:flex-row items-center shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-xs lg:max-w-sm rounded-lg object-cover"
      />
      <div className="lg:ml-10 mt-6 lg:mt-0">
        <h3 className="text-3xl font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in
          sapien quam risus sed diam.
        </p>
        <div className="flex items-center mt-6 space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full shadow-md">
            Buy {product.price}
          </button>
          <button className="border border-gray-300 py-3 px-6 rounded-full text-gray-600 font-medium">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

const PopularSection = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    brand: '',
  });
  const [listFilteredProducts, setListFilteredProducts] = useState(products);
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleFilterPress = () => {
    console.log('Filter Pressed');
    const filteredProducts = products.filter((product) => {
      const isWithinPriceRange =
        Number(product.price) >= filters.priceRange[0] &&
        Number(product.price) <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesBrand =
        !filters.brand ||
        product.brand?.toLowerCase() === filters.brand.toLowerCase();
      if (
        isWithinPriceRange &&
        matchesRating &&
        matchesCategory &&
        matchesBrand
      ) {
        return product;
      }
    });

    setListFilteredProducts(filteredProducts);
  };
  return (
    <div className="px-6 py-12 bg-white mx-auto max-w-7xl">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-900">
          Popular Products on Lenny
        </h2>
        <p className="text-gray-500 mt-2">
          Discover the most trending products this season
        </p>
      </div>
      <div>
        <FilterPanel
          filters={filters}
          handleFilterPress={handleFilterPress}
          onFilterChange={handleFilterChange}
        />
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listFilteredProducts.map((product) => (
          <ContainProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-6 rounded-full border border-gray-300">
          Load More
        </button>
      </div>

      {/* Featured Product */}
      <FeaturedProduct
        product={{
          name: 'Ipad Air Gen 5',
          price: '$900',
          image:
            'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp-image',
        }}
      />
    </div>
  );
};

export default PopularSection;
