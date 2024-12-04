'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const setCookie = async (token: any) => {
  const res = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  // console.log('Response:', res);
  if (res.status === 200) {
    // Redirect to dashboard
    console.log('Login successful');
  } else {
    // Display error message
    console.log('Login failed');
  }
};

export default function PaymentSuccess() {
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(urlParams);
    if (token) {
      localStorage.setItem('token', token); // Lưu token vào localStorage
      console.log('Login successful, token saved.');
      setCookie(token);
    }
  }, []);
  return (
    <div className="flex items-center justify-center p-12 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Login Successful
        </h1>

        {/* Message */}

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
