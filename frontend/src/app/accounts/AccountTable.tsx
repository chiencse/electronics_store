'use client';

import React, { useEffect, useState, useMemo } from 'react';
import AccountsForm from './AccountForm';
import UpdateAccountForm from './AccountUpdate';
type Account = {
  id: string;
  createdAt: string;
  FName: string;
  LName: string;
  role: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  address: string;
  status: 'Verified' | 'Active' | 'Blocked';
  orders: number;
  avatar?: string;
};

const AccountsTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
  });
  const [sortBy, setSortBy] = useState<'date' | 'orders'>('date');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/all`,
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

      const data: any[] = await response.json();

      const formattedData: Account[] = data.map((item) => ({
        id: `...${item.id.slice(0, 5)}`,
        createdAt: item.createdAt,
        FName: `${item.Fname} `,
        LName: `${item.LName}`,
        role: item.roles || 'user',
        username: item.username || 'N/A',
        email: item.email || 'N/A',
        phoneNumber: item.phone_number ? item.phone_number.toString() : 'N/A',
        address: item.address || 'N/A',
        status: item.roles === 'admin' ? 'Verified' : 'Active',
        orders: item.orders?.length || 0,
        avatar: item.avatar,
      }));

      setAccounts(formattedData);
      setFilteredAccounts(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle filters
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = [...accounts];

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (acc) =>
          acc.FName.toLowerCase().includes(lowerQuery) ||
          acc.LName.toLowerCase().includes(lowerQuery) ||
          acc.email.toLowerCase().includes(lowerQuery) ||
          acc.username.toLowerCase().includes(lowerQuery)
      );
    }

    if (filters.role) {
      filtered = filtered.filter((acc) => acc.role === filters.role);
    }
    if (filters.status) {
      filtered = filtered.filter((acc) => acc.status === filters.status);
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === 'orders') {
        return b.orders - a.orders;
      }
      return 0;
    });
  }, [accounts, searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccounts = filteredAndSortedAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  if (loading) {
    return <span className="loading loading-bars loading-xs"></span>;
  }

  return (
    <div className="p-4">
      <div className="flex bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered w-64 join-item"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
            </div>
          </div>

          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            name="role"
            className="select select-bordered select-sm"
            value={filters.role}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            name="status"
            className="select select-bordered select-sm"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Status</option>
            <option value="Verified">Verified</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'orders')}
          >
            <option value="date">Sort by Date</option>
            <option value="orders">Sort by Orders</option>
          </select>
          <button
            className="btn btn-sm bg-green-600 text-white"
            onClick={() => setIsRegisterOpen(true)}
          >
            + Add User
          </button>
        </div>
      </div>
      <div className="bg-white justify-between items-center mb-4 p-4 rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAccounts.map((account) => (
              <tr key={account.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            account.avatar || 'https://via.placeholder.com/150'
                          }
                          alt={account.username}
                        />
                      </div>
                    </div>
                    <span>{`${account.FName} ${account.LName}`}</span>
                  </div>
                </td>
                <td>{account.role}</td>
                <td>{new Date(account.createdAt).toLocaleDateString()}</td>
                <td>{account.email}</td>
                <td>{account.username}</td>
                <td>{account.phoneNumber}</td>
                <td>{account.orders}</td>
                <td>
                  <span
                    className={`badge ${
                      account.status === 'Verified'
                        ? 'badge-success'
                        : account.status === 'Blocked'
                          ? 'badge-error'
                          : 'badge-warning'
                    }`}
                  >
                    {account.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => {
                        setSelectedAccount(account);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button className="btn btn-xs btn-neutral">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-gray-500">
              Showing {paginatedAccounts.length} of {accounts.length} Results
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
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(Math.min(1, currentPage - 1))}
            >
              «
            </button>
            <button className="join-item btn-sm">Page {currentPage}</button>
            <button
              className="join-item btn-sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            >
              »
            </button>
          </div>
        </div>
      </div>
      <AccountsForm
        isModalOpen={isRegisterOpen}
        setIsModalOpen={setIsRegisterOpen}
      />
      <UpdateAccountForm
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        account={selectedAccount}
        updateAccountList={(updatedAccount) => {
          setAccounts((prevAccounts) =>
            prevAccounts.map((acc) =>
              acc.id === updatedAccount.id ? updatedAccount : acc
            )
          );
        }}
      />
    </div>
  );
};

export default AccountsTable;
