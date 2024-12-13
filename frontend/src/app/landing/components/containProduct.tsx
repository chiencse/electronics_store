import Link from 'next/link';
import React from 'react';
const DiscountNumber = 0.95;

const ContainProduct = ({ product }: any) => {
  return (
    <Link href={`/detail?id=${product.id}`} passHref>
      <div
        key={product.id}
        className="bg-white border border-gray-200 shadow rounded-lg hover:cursor-pointer hover:shadow-xl overflow-hidden w-64 h-88"
      >
        <img
          src={product.imageProducts?.[0]?.imageUrl || '/placeholder.jpg'}
          alt={product.name}
          className=" mx-auto h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-gray-400 font-bold mt-1">
            <del>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
              }).format(product.baseprice)}
            </del>
          </p>
          <p className="text-green-600 font-bold mt-1">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'VND',
            }).format(product.baseprice * DiscountNumber)}
          </p>
          <div className="flex items-center mt-2 text-gray-400">
            <span className="text-yellow-500">⭐ {product.averageRating}</span>
            <span className="ml-2 text-sm">{product.sold || 0} Sold</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContainProduct;
