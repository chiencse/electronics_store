import React from 'react';

const products = [
  { id: 1, name: 'Spy x Family Tshirt', price: '$26', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 2, name: 'Green Man Jacket', price: '$49', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 3, name: 'Iphone 14 Pro Max', price: '$1200', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 4, name: 'Oversized Tshirt', price: '$48', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 5, name: 'Brown Woman Hoodie', price: '$49', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 6, name: 'Airpod Pro 2022', price: '$459', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 7, name: 'DJI Mini 3 Pro', price: '$842', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
  { id: 8, name: 'Ipad Pro Gen 3', price: '$338', rating: 4.8, sold: 1238, location: 'North Purwokerto', image: 'https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp' },
];

const PopularSection = () => {
  return (
    <div className="px-6 py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-900">Popular Product on Lenny</h2>
        <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in</p>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">{product.price}</p>
              <p className="text-gray-500 text-sm">{product.location}</p>
              <div className="flex items-center mt-2 text-gray-400">
                <span className="text-yellow-500">⭐ {product.rating}</span>
                <span className="ml-2 text-sm">{product.sold} Sold</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-6 rounded-full border border-gray-300">
          Load More
        </button>
      </div>

      {/* Featured Product Section */}
      <div className="mt-12 bg-gray-50 p-8 rounded-lg flex flex-col lg:flex-row items-center shadow-md">
        <img src="https://monngonmoingay.com/wp-content/smush-webp/2024/10/Salad-ca-hoi-sot-tom-kho.png.webp-image" alt="Ipad Air Gen 5" className="w-80 lg:w-96" />
        <div className="lg:ml-10 mt-6 lg:mt-0">
          <h3 className="text-3xl font-semibold text-gray-900">Ipad Air Gen 5</h3>
          <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam.</p>
          <div className="flex items-center mt-6 space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full">Buy $900</button>
            <button className="border border-gray-300 py-3 px-6 rounded-full text-gray-600 font-medium">View Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSection;