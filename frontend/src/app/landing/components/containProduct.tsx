import React from 'react';

const ContainProduct = ({ product }: any) => {
  return (
    <div
      key={product.id}
      className="bg-white border border-gray-200 shadow rounded-lg overflow-hidden w-64 h-88"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
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
  );
};

export default ContainProduct;
