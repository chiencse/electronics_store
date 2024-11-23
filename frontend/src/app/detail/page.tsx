import Image from 'next/image';
import ProductImageSlider from './components/ProductImageSlider';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-green-700">lenny.</div>

          {/* Search */}
          <div className="relative flex-1 mx-6">
            <input
              type="text"
              placeholder="Search on lenny..."
              className="w-full border rounded-full py-2 px-4 text-sm focus:outline-none"
            />
            <button className="absolute right-2 top-2 text-gray-500">
              🔍
            </button>
          </div>

          {/* Icons */}
          <div className="flex space-x-4">
            <button className="text-gray-500">🔔</button>
            <button className="text-gray-500">🛒</button>
            <button className="text-gray-500">👤</button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 py-4 text-sm text-gray-500">
        Home &gt; Electronics &gt; Gaming Gear &gt; <span className="text-gray-900">G502 X Lightspeed Wireless Gaming Mouse</span>
      </nav>

      {/* Product Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Carousel */}
        <div>
    <ProductImageSlider />
  </div>

{/* Right: Product Details */}
<div>
  <h1 className="text-2xl font-bold mb-4">
    G502 X Lightspeed Wireless Gaming Mouse
  </h1>
  <div className="flex items-center space-x-2 mb-4">
    <span className="text-yellow-500">⭐ 4.8</span>
    <span className="text-gray-500">(1,238 Sold)</span>
  </div>
  <div className="text-3xl font-semibold text-green-700 mb-4">
    $139.99
  </div>
  <p className="text-gray-700 mb-6">
    G502 X LIGHTSPEED is the latest addition to legendary G502 lineage. Featuring our first-ever LIGHTFORCE hybrid optical-mechanical switches and updated LIGHTSPEED wireless protocol with 68% faster response rate.
  </p>

  {/* Product Variants */}
  <div className="mb-6 flex gap-4">
    <div className="mb-4">
      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
        Type
      </label>
      <select
        id="type"
        className="w-fit  border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-green-700 focus:border-green-700"
      >
        <option>Wireless</option>
        <option>Wired</option>
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
        Color
      </label>
      <select
        id="color"
        className="w-fit border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-green-700 focus:border-green-700"
      >
        <option>Black</option>
        <option>White</option>
        <option>Blue</option>
      </select>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex space-x-4">
    <button className="bg-green-700 text-white py-2 px-6 rounded-lg">
      Buy Now
    </button>
    <button className="border border-green-700 text-green-700 py-2 px-6 rounded-lg">
      Add to Cart
    </button>
  </div>
</div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto mt-8 px-6">
        <div className="flex space-x-8 border-b">
          {['Detail Product', 'Merchant', 'Reviews', 'Related Product'].map((tab) => (
            <button key={tab} className="py-2 px-4 text-gray-700 border-b-2 border-transparent hover:border-green-700">
              {tab}
            </button>
          ))}
        </div>
      </div>

{/* Specification Section */}
<div className="mt-12">
  <h2 className="text-xl font-bold text-gray-800 mb-6">Specification Details</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Left: Specifications */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
      <ul className="space-y-2 text-gray-700">
        <li>
          <strong>Brand:</strong> Logitech
        </li>
        <li>
          <strong>Type:</strong> Wired
        </li>
        <li>
          <strong>Resolution:</strong> 100-25,600 dpi
        </li>
        <li>
          <strong>Max Speed:</strong> >40G
        </li>
        <li>
          <strong>Max Acceleration:</strong> >300 IPS
        </li>
      </ul>
    </div>

    {/* Middle: What's in the Box */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">In the Box</h3>
      <ul className="space-y-2 text-gray-700">
        <li>G502 X Lightspeed Wireless Gaming Mouse</li>
        <li>DPI-Shift button cover</li>
        <li>USB-C charging cable</li>
        <li>LIGHTSPEED USB-A receiver</li>
        <li>USB extension cable</li>
        <li>User Documentation</li>
      </ul>
    </div>

    {/* Right: System Requirements */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">System Requirements</h3>
      <ul className="space-y-2 text-gray-700">
        <li>- USB Port</li>
        <li>- Internet access for optional software download</li>
        <li>- Windows 10 or later</li>
        <li>- macOS 10.14 or later</li>
      </ul>
    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; 2024 lenny. All rights reserved.
        </div>
      </footer>
    </div>
  );
}