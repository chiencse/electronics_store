'use client';
import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
const toastSuccess = () => {
  toast.success('Successful!', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  });
};
const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của mật khẩu
    if (newPassword !== confirmPassword) {
      setError('New password and verbal password confirm.');
      return;
    }
    if (newPassword.length < 6) {
      setError('The new password must have at least 6 characters.');
      return;
    }

    // Giả lập quá trình thay đổi mật khẩu
    setError('');
    setSuccess(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/change-password`,
        { Newpassword: newPassword, OldPassword: oldPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toastSuccess();
      console.log('Đổi mật khẩu thành công');
    } catch (error: any) {
      console.error(
        'Error fetching user:',
        error.response ? error.response.data : error.message
      );
    }

    // Ở đây bạn sẽ gọi API để thay đổi mật khẩu
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <p className="text-sm text-gray-500 mb-6">
        To ensure security please set a password with at least 6 characters
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu cũ *
          </label>
          <input
            type="password"
            id="oldPassword"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu mới *
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Xác nhận lại mật khẩu *
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-4">
            Mật khẩu đã được thay đổi thành công!
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
