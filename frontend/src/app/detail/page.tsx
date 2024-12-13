'use client';
import ProductImageSlider from './components/ProductImageSlider';

import { useEffect, useState } from 'react';
import Review from './components/Review';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import Swal from 'sweetalert2';
const DiscountNumber = 0.95;

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
const sweetSuccess = () => {
  Swal.fire({
    title: 'Successfully!',
    text: 'You item is added to cart!',
    icon: 'success',
    confirmButtonText: 'Cool',
  });
};

export default function ProductPage() {
  const [detailProduct, setDetailProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState(); // Biến thể mặc định

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        const id = urlParams.get('id');
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/getDetailProduct/${id}`
        );
        console.log(res.data);
        if (res.status === 200) {
          setDetailProduct(res.data);
          setSelectedVariant(res.data.variants[0]); // Chọn biến thể đầu tiên
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetailProduct();
  }, []);

  const handleVariantClick = (variant: any) => {
    setSelectedVariant(variant); // Cập nhật biến thể được chọn
  };
  if (!detailProduct)
    <div className="text-center text-gray-600">Loading...</div>;
  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          productId: detailProduct.id,
          variantId: selectedVariant?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 201) {
        toastSuccess();
      }
    } catch (error) {
      console.error(
        'Error adding to cart:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <nav className="container mx-auto w-[82rem]  py-4 text-sm text-gray-500">
        Home &gt; Electronics &gt; Gaming Gear &gt;{' '}
        <span className="text-gray-900">
          G502 X Lightspeed Wireless Gaming Mouse
        </span>
      </nav>

      {/* Product Section */}
      <div className="container mx-auto w-[82rem] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Carousel */}
        <div>
          <ProductImageSlider ListImages={detailProduct?.imageProducts} />
        </div>

        {/* Right: Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{detailProduct?.name}</h1>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-500">
              ⭐ {detailProduct?.averageRating}
            </span>
            <span className="text-gray-500">(1,238 Sold)</span>
          </div>
          {/* Giá tiền của biến thể được chọn */}
          <div className="text-xl font-semibold text-gray-400 ml-2">
            <del>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
              }).format(selectedVariant?.price)}
            </del>
          </div>
          <div className="text-3xl font-semibold text-green-700 mb-4">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'VND',
            }).format(selectedVariant?.price * DiscountNumber)}
          </div>
          <p className="text-gray-700 mb-6 h-24">
            {detailProduct?.description}
          </p>

          {/* Product Variants */}
          <div className="mb-6 flex gap-4 items-center ">
            {detailProduct?.variants.map((variant: any) => (
              <button
                key={variant.id}
                onClick={() => handleVariantClick(variant)} // Xử lý khi chọn
                className={`w-28 h-12 rounded-md border-2 flex flex-col items-center justify-center font-[poppins] transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                  selectedVariant?.id === variant.id
                    ? 'border-green-700 bg-green-100' // Biến thể được chọn
                    : 'border-gray-200 bg-white'
                }`}
              >
                <p>{variant.rom}GB</p>
                <p>
                  {' '}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(variant?.price)}
                </p>
                <span
                  className={`block w-8 h-8 rounded-full bg-${variant?.color.toLowerCase()}-500`}
                />
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-800 active:scale-95">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="border border-green-700 text-green-700 py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-700 hover:text-white active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto w-[82rem] mt-8 ">
        <div className="flex space-x-8 border-b">
          {['Detail Product', 'Merchant', 'Reviews', 'Related Product'].map(
            (tab) => (
              <button
                key={tab}
                className="py-2 px-4 text-gray-700 border-b-2 border-transparent hover:border-green-700"
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Specification Section */}
      <div className="mt-12 px-28 font-[Roboto]">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Specification Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Specifications */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Specifications
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-700">
              <li>
                <strong>Brand:</strong> Logitech
              </li>
              <li>
                <strong>Battery:</strong> {detailProduct?.battery}
              </li>
              <li>
                <strong>Camera:</strong> {detailProduct?.camera}
              </li>
              <li>
                <strong>Cellular:</strong>{' '}
                {detailProduct?.cellular ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Refresh Rate:</strong> {detailProduct?.refreshRate} Hz
              </li>
              <li>
                <strong>Screen Size:</strong> {detailProduct?.screenSize}"
              </li>
              <li>
                <strong>Screen Type:</strong> {detailProduct?.screenType}
              </li>
            </ul>
          </div>

          {/* Middle: Variants Specifications */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Variant Specifications
            </h3>
            <div className="space-y-4">
              {detailProduct?.variants?.map((variant, index) => (
                <div key={variant.id} className="border-t pt-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Variant {index + 1}: {variant.color}
                  </h4>
                  <ul className="grid grid-cols-2 gap-y-2 text-gray-700 mt-2">
                    <li>
                      <strong>Color:</strong> {variant.color}
                    </li>
                    <li>
                      <strong>RAM:</strong> {variant.ram} GB
                    </li>
                    <li>
                      <strong>ROM:</strong> {variant.rom} GB
                    </li>
                    <li>
                      <strong>CPU:</strong> {variant.cpu}
                    </li>
                    <li>
                      <strong>Price:</strong> ${variant.price}
                    </li>
                    <li>
                      <strong>Quantity:</strong> {variant.quantity}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What's in the Box */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              In the Box
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>G502 X Lightspeed Wireless Gaming Mouse</li>
              <li>DPI-Shift button cover</li>
              <li>USB-C charging cable</li>
              <li>LIGHTSPEED USB-A receiver</li>
              <li>USB extension cable</li>
              <li>User Documentation</li>
            </ul>
          </div>
        </div>
        <div className="Line12 w-full mt-8 h-px border border-[#e4e9ee]"></div>
      </div>

      {/* Merchant Section */}
      <div className=" font-[Roboto] bg-white mx-28 mt-6 h-40 rounded-md border-2 shadow-md">
        <h2 className="text-xl font-bold  text-gray-800 mb-2">
          Merchant Information
        </h2>
        <div className="flex flex-row">
          <div className=" ">
            <img
              src=""
              alt="Logo"
              className=" h-20 w-20 bg-cyan-400 rounded-full ml-4 mt-2 shadow-md"
            />
          </div>
          <div className="flex flex-col ml-6">
            <h3 className="text-lg font-semibold text-gray-800 ">BKestore</h3>
            <p className="text-gray-700">MInh Chien</p>
            <p className="text-gray-700">VietName</p>
            <p className="text-gray-700">MInhchien@khjihaskdn</p>
          </div>
        </div>
        <div className="Line12 w-full mt-12 h-px border border-[#e4e9ee]"></div>
      </div>

      {/* Reviews Section */}
      <Review detailProduct={detailProduct} variant={selectedVariant} />
    </div>
  );
}
