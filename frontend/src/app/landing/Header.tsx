import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="text-2xl font-extrabold text-green-800">lenny.</div>
      <div className="flex items-center space-x-4">
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none">
          <option>All Categories</option>
          {/* Add other categories if needed */}
        </select>
        <input
          type="text"
          placeholder="Search on lenny..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full max-w-xs focus:outline-none"
        />
        <div className="space-x-3 flex items-center">
          <button className="text-gray-700">
            <i className="fas fa-user text-lg"></i>
          </button>
          <button className="text-gray-700">
            <i className="fas fa-shopping-cart text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
