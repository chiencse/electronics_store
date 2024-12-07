'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

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

type UpdateAccountFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  account: Account;
  updateAccountList: (updatedAccount: Account) => void; // Callback to update account list
};

const UpdateAccountForm: React.FC<UpdateAccountFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  account,
  updateAccountList,
}) => {
  const [updatedUser, setUpdatedUser] = useState({
    FName: account?.FName|| '',
    LName: account?.LName|| '',
    email: account?.email|| '',
    username: account?.username|| '',
    phone_number: account?.phoneNumber || '',
    address: account?.address|| '',
    roles: account?.role|| '',
    password: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedAccount = await response.json();
      toast.success('User updated successfully! 🎉');

      // Update account list
      updateAccountList({ ...account, ...updatedUser });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user');
    }
  };

  // Detect clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="p-4">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="font-bold text-lg py-2">Update User Details</h3>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={account?.FName|| 'First Name'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.FName}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, FName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={account?.LName|| 'Last Name'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.LName}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, LName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder={account?.email|| 'Email'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.email}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={account?.username|| 'Username'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.username}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder={account?.phoneNumber || 'Phone Number'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.phone_number}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, phone_number: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={account?.address|| 'Address'}
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.address}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder='Password'
                  className="input input-bordered input-sm w-full"
                  value={updatedUser.password}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="role"
                  className="select select-bordered select-sm w-full"
                  value={updatedUser.roles}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, roles: e.target.value })
                  }
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAccountForm;
