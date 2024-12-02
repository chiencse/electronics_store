'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    Fname: 'Your First Name',
    LName: 'Your Last Name',
    email: '',
    username: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const user = res.data;
        setFormData({
          Fname: user.Fname,
          LName: user.LName,
          email: user.email,
          username: user.username,
          phone_number: user.phone_number.toString(),
          address: user.address,
        });
      } catch (error: any) {
        console.error(
          'Error fetching user:',
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchUser();
  }, []);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess(false);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        formData, // Send the entire formData object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
      console.log('User updated successfully:', res.data);
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
      console.error(
        'Error updating user:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Information</h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm mb-4">
          Your information has been updated successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="Fname"
            className="block text-sm font-medium text-gray-700"
          >
            First Name *
          </label>
          <input
            type="text"
            id="Fname"
            name="Fname"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.Fname}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="LName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="LName"
            name="LName"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.LName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
