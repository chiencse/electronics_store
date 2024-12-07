'use client';
import React, { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import Image from 'next/image';
type Account = {
  id: string;
  createdAt: string;
  user: string;
  status: 'Verified' | ' Active' | 'Blocked';
  username: string;
  avatar?: string;
};

const statusClass: Record<Account['status'], string> = {
  Verified: 'badge-success text-xs text-white',
  Active: 'badge-success text-xs text-white',
  Blocked: 'badge-success text-xs text-white',
};

const NewAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchAccounts = async () => {
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

        const data: Account[] = await response.json();

        const formattedData = data
          .map((item) => ({
            id: `...${item.id.slice(0, 5)}`,
            createdAt: item.createdAt,
            user: `${item.Fname} ${item.LName.charAt(0)}.`,
            status: item.roles === 'admin' ? 'Verified' : 'Active',
            username: item.username,
            avatar: item.avatar,
          }))
          .sort(
            (a, b) => {
              console.log(a.createdAt, b.createdAt);
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              console.log(dateA, dateB);
              return dateB - dateA;
            }
          )
          .slice(0, 5); 
        
          

        setAccounts(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <div className="skeleton w-full h-80"></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="card bg-base-100 shadow-xl p-4 rounded-lg">
      <div className="flex justify-between items-center border-b-2 mb-4 p-2">
        <h2 className="text-lg font-bold">New Accounts</h2>
        <button className="btn btn-sm btn-outline">View All</button>
      </div>
      <table className="table w-full">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Date</th>
            <th>User</th>
            <th>Account</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{new Date(account.createdAt).toLocaleDateString()}</td>
              <td>
              <div className="flex flex-row  items-center gap-2">
                <div className="chat-image avatar">
                  <div className="w-6 rounded-full">
                    <Image
                      src={account.avatar || 'https://via.placeholder.com/150'}
                      width={150}
                      height={150}
                      alt={`${account.user}'s avatar`}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{account.user}</div>
                </div>
              </div>
              </td>
              <td>
                <span className={`badge ${statusClass[account.status]}`}>
                  {account.status}
                </span>
              </td>
              <td>{account.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewAccounts;
