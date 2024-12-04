'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const PaymentFailed = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Thanh toán thất bại!
      </h1>
      <p className="text-lg text-gray-700">
        Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau hoặc liên
        hệ hỗ trợ.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={() => router.push('/cart')}
      >
        Quay lại giỏ hàng
      </button>
    </div>
  );
};

export default PaymentFailed;
