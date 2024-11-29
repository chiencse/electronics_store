'use client';
import ContainProduct from '@/app/landing/components/containProduct';
import { useState } from 'react';
const product = [
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
const SearchLayout = () => {
  const [filters, setFilters] = useState({
    rating: '',
    delivery: false,
    discount: false,
    label: '',
    category: '',
    priceRange: { min: '', max: '' },
    sortBy: 'relevant',
  });

  const [products, setProducts] = useState(product); // Sản phẩm từ API

  // Xử lý khi filter thay đổi
  const handleFilterChange = (field: any, value: any) => {
    console.log(filters);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch data dựa trên filters
  const fetchProducts = async () => {
    // Ví dụ fetch giả lập
    const filteredProducts = product.filter((product) => {
      return (
        (!filters.rating || product.rating >= Number(filters.rating)) &&
        (!filters.location || product.location === filters.location) &&
        (!filters.category || product.category === filters.category) &&
        (filters.priceRange.min === '' ||
          Number(product.price) >= parseFloat(filters.priceRange.min)) &&
        (filters.priceRange.max === '' ||
          Number(product.price) <= parseFloat(filters.priceRange.max))
      );
    });
    console.log(filteredProducts);
    setProducts(filteredProducts);
  };

  return (
    <div className="flex mx-28 mt-6 font-[Roboto]">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-r">
        <h2 className="font-bold mb-4">Filter Option</h2>

        {/* Rating */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Best Filter</h3>
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.rating >= 4}
              onChange={(e) =>
                handleFilterChange('rating', e.target.checked ? 4 : '')
              }
            />
            4 stars or upper
          </label>
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.delivery}
              onChange={(e) => handleFilterChange('delivery', e.target.checked)}
            />
            Same-day delivery
          </label>
        </div>

        {/* Location */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Label</h3>
          {['Samsung', 'Apple', 'Xiaomi'].map((loc) => (
            <label key={loc} className="block">
              <input
                type="radio"
                name="label"
                className="mr-2"
                value={loc}
                checked={filters.label === loc}
                onChange={(e) => handleFilterChange('label', e.target.value)}
              />
              {loc}
            </label>
          ))}
        </div>

        {/* Category */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Category</h3>
          {['SmartPhone', 'Laptop', 'Gaming'].map((cat) => (
            <label key={cat} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.category === cat}
                onChange={(e) =>
                  handleFilterChange('category', e.target.checked ? cat : '')
                }
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full border rounded-md px-2"
              value={filters.priceRange.min}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: e.target.value,
                })
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full border rounded-md px-2"
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex items-end mt-4">
          <button
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition-colors duration-300"
            onClick={() => fetchProducts()}
          >
            Find
          </button>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-3/4 p-4 ml-4">
        <div className="flex justify-between mb-4">
          <p>
            Showing products for <strong>Gaming Gear</strong>
          </p>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="relevant">Relevant Products</option>
            <option value="priceLow">Price Low to High</option>
            <option value="priceHigh">Price High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {products.map((product) => (
            <ContainProduct product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

// Fake product data

export default SearchLayout;
