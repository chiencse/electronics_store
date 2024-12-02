'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy mã đơn hàng từ query
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Thanh toán thành công!
      </h1>
      <p className="text-lg text-gray-700">
        Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là{' '}
        <span className="font-bold">{orderId}</span>.
      </p>
      <p className="text-gray-600 mt-4">
        Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={() => router.push('/')}
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default PaymentSuccess;
