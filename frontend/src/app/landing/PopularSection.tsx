'use client';

import React, { useEffect, useState } from 'react';
import ContainProduct from './components/containProduct';
import axios from 'axios';

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
    <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg flex flex-col lg:flex-row items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full lg:w-1/2">
        <img
          src="/images.jpg"
          alt="featured-product"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="lg:ml-10 mt-6 lg:mt-0 text-center lg:text-left">
        <h3 className="text-4xl font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Experience the power of the iPad Pro M4 with its stunning Liquid Retina display, advanced M4 chip, and sleek design, perfect for both work and play.
        </p>
        <div className="flex items-center mt-6 justify-center lg:justify-start space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
            Buy Now for {product.price}
          </button>
          <button className="border border-gray-300 py-3 px-6 rounded-full text-gray-700 font-medium hover:border-gray-400 hover:text-gray-900 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};



const PopularSection = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100000000],
    rating: 0,
    brand: '',
  });
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm gốc
  const [listFilteredProducts, setListFilteredProducts] = useState([]); // Dữ liệu đã lọc

  // Lấy dữ liệu sản phẩm từ API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/getAllProduct`
        );
        if (res.status === 200) {
          setProducts(res.data.data); // Lưu sản phẩm gốc
          setListFilteredProducts(res.data.data); // Hiển thị mặc định
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // Lọc sản phẩm khi nhấn nút "Filter"
  const handleFilterPress = () => {
    const filteredProducts = products.filter((product: any) => {
      const isWithinPriceRange =
        Number(product.baseprice) >= filters.priceRange[0] &&
        Number(product.baseprice) <= filters.priceRange[1];
      const matchesRating = product.averageRating >= filters.rating; // Phù hợp với đánh giá
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesBrand =
        !filters.brand ||
        product.brand?.toLowerCase() === filters.brand.toLowerCase();

      return (
        isWithinPriceRange && matchesRating && matchesCategory && matchesBrand
      );
    });

    setListFilteredProducts(filteredProducts);
  };

  return (
    <div className="px-6 py-12 bg-white mx-auto max-w-7xl">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-900">
          Popular Products on eBKStore
        </h2>
        <p className="text-gray-500 mt-2">
          Discover the most trending products this season
        </p>
      </div>

      {/* Bộ lọc */}
      <div>
        <FilterPanel
          filters={filters}
          handleFilterPress={handleFilterPress}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listFilteredProducts.map((product: any) => (
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
          name: 'iPad Pro M4',
          price: '$900',
       
        }}
      />
    </div>
  );
};

export default PopularSection;
