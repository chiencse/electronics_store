'use client';

import React, { useState, useRef, useEffect } from 'react';


import { toast, ToastContainer } from 'react-toastify';
  


type AccountsFormProps = {
  isModalOpen: boolean;
  setIsRegisterOpen: (isOpen: boolean) => void;
};
const AccountsForm: React.FC<AccountsFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [newUser, setNewUser] = useState<any>({
    Fname: '',
    LName: '',
    email: '',
    username: '',
    phone_number: '',
    address: '',
    password: '',
    roles: 'user',
  });
  const [avatar, setAvatar] = useState<File | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();
      toast.success('User created successfully! 🎉');

      if (avatar) {
        const formData = new FormData();
        formData.append('file', avatar);

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${createdUser.id}/avatar`,
          {
            method: 'POST',
            headers: {
              Accept: '*/*',
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload avatar');
          toast.error('Failed to upload avatar');
        }
        toast.success('Avatar upload successfully! 🎉');
      }

      setAccounts((prev) => [
        ...prev,
        {
          ...newUser,
          id: createdUser.id,
          createdAt: new Date().toLocaleDateString(),
          avatar: avatar ? URL.createObjectURL(avatar) : null,
          orders: 0,
        },
      ]);

      setIsModalOpen(false); 
      setNewUser({
        Fname: '',
        LName: '',
        email: '',
        username: '',
        phone_number: '',
        address: '',
        password: '',
        roles: 'user',
      });
      setAvatar(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
      
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
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
      {/* Add User Button */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="font-bold text-lg py-2">Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered input-sm w-full"
                  value={newUser.Fname}
                  onChange={(e) =>
                    setNewUser({ ...newUser, Fname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered input-sm w-full"
                  value={newUser.LName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, LName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-sm  w-full"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered input-sm w-full"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered input-sm w-full"
                  value={newUser.phone_number}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone_number: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-sm w-full"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="role"
                  className="select select-bordered select-sm w-full"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, roles: e.target.value })
                  }
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  className="file-input w-full"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
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
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsForm;
