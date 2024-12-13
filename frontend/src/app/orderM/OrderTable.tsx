'use client';

import React, { useEffect, useState, useMemo } from 'react';
import UpdateOrderForm from './UpdateOrderForm'; // Import your UpdateOrderForm component

type Order = {
  id: string;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
  totalPrice: number;
  address: string;
  customerName: string;
  customerEmail: string;
  items: number;
};

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'totalPrice'>('date');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/allOrder`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const body: any[] = await response.json();
      const data = body.data;

      const formattedData: Order[] = data.map((order) => ({
        id: `${order.id}`,
        orderDate: order.orderDate,
        status: order.status || 'pending',
        totalPrice: order.totalPrice || 0,
        address: order.address || 'N/A',
        customerName: `${order.customer.Fname} ${order.customer.LName}`,
        customerEmail: order.customer.email,
        items: order.orderProducts.length,
      }));

      setOrders(formattedData);
      setFilteredOrders(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(lowerQuery) ||
          order.customerEmail.toLowerCase().includes(lowerQuery)
      );
    }

    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return (
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      } else if (sortBy === 'totalPrice') {
        return b.totalPrice - a.totalPrice;
      }
      return 0;
    });
  }, [orders, searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredAndSortedOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  if (loading) {
    return <span className="loading loading-bars loading-xs"></span>;
  }

  return (
    <div className="p-4">
      <div className="flex bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <div>
          <input
            className="input input-bordered w-64"
            placeholder="Search by customer name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            name="status"
            className="select select-bordered select-sm"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'totalPrice')}
          >
            <option value="date">Sort by Date</option>
            <option value="totalPrice">Sort by Total Price</option>
          </select>
        </div>
      </div>
      <div className="bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Items</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>...{order.id.slice(-5)}</td>
                <td>{order.customerName}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalPrice.toLocaleString()}</td>
                <td>{order.items}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === 'completed'
                        ? 'badge-success'
                        : order.status === 'cancelled'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleEditOrder(order)}
                    >
                      ✏️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span>
              Showing {paginatedOrders.length} of {orders.length} Results
            </span>
            <select
              className="ml-4 select select-bordered select-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
          <div>
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              «
            </button>
            <span className="mx-2">Page {currentPage}</span>
            <button
              className="btn btn-sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              »
            </button>
          </div>
        </div>
      </div>
      {isUpdateModalOpen && selectedOrder && (
        <UpdateOrderForm
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          order={selectedOrder}
          updateOrderList={(updatedOrder) => {
            setOrders((prevOrders) =>
              prevOrders.map((ord) =>
                ord.id === updatedOrder.id ? updatedOrder : ord
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default OrdersTable;
