'use client';

import React from 'react';
const orders = [
  {
    orderDate: '2024-11-11T14:21:13.000Z',
    id: '3e60dce3-58b6-4ed0-948b-be5c63a60be1',
    createdAt: '2024-11-11T07:21:12.531Z',
    updatedAt: '2024-11-11T07:21:12.531Z',
    requiredDate: '2024-11-11T14:20:50.000Z',
    shippedDate: '2024-11-11T14:20:50.000Z',
    status: 'string',
    comments: 'string',
    totalPrice: 0,
    address: '',
    orderIdd: 0,
  },
  {
    orderDate: '2024-11-11T14:34:04.000Z',
    id: '74860e14-d664-49a3-a4fe-2c6e39bef7d5',
    createdAt: '2024-11-11T07:34:03.909Z',
    updatedAt: '2024-11-11T07:34:03.909Z',
    requiredDate: '2024-11-11T14:34:03.000Z',
    shippedDate: '2024-11-11T14:34:03.000Z',
    status: 'string',
    comments: 'string',
    totalPrice: 0,
    address: '',
    orderIdd: 0,
  },
  {
    orderDate: '2024-12-01T08:51:25.000Z',
    id: '8f2c0e22-e037-4a49-a92c-9f6e4ac7a45b',
    createdAt: '2024-12-01T01:51:25.309Z',
    updatedAt: '2024-12-01T01:51:25.309Z',
    requiredDate: '2024-12-01T08:50:12.000Z',
    shippedDate: '2024-12-01T08:50:12.000Z',
    status: 'string',
    comments: 'string',
    totalPrice: 100000,
    address: 'string',
    orderIdd: 24,
  },
  {
    orderDate: '2024-11-11T14:25:48.000Z',
    id: 'bdd72f6d-93e8-4e5a-8358-748433b7980d',
    createdAt: '2024-11-11T07:25:47.661Z',
    updatedAt: '2024-11-11T07:25:47.661Z',
    requiredDate: '2024-11-11T14:20:50.000Z',
    shippedDate: '2024-11-11T14:20:50.000Z',
    status: 'string',
    comments: 'string',
    totalPrice: 0,
    address: '',
    orderIdd: 0,
  },
];
const OrderListPage = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">List of orders</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order_ID</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {order.orderIdd || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.totalPrice} VND
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.address || 'Chưa cung cấp'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderListPage;
