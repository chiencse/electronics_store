'use client';
import Header from '@/Layouts/Header';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ContainProduct from '../landing/components/containProduct';
import { listProduct } from '@/data/products';
import Footer from '@/Layouts/Footer';

const initialCart = [
  {
    id: 1,
    label: 'Apple',

    products: [
      {
        id: 101,
        name: 'Logitech G435 Gaming Headset',
        price: 250,
        quantity: 1,
        imageUrl: 'https://picsum.photos/id/1/200/300',
      },
      {
        id: 102,
        name: 'Logitech G502 Hero',
        price: 89,
        quantity: 1,
        imageUrl: 'https://picsum.photos/id/1/200/300',
      },
      {
        id: 103,
        name: 'Logitech G303 Shroud Edition',
        price: 46,
        quantity: 1,
        imageUrl: 'https://picsum.photos/id/1/200/300',
      },
    ],
  },
  {
    id: 2,
    label: 'Samsung',
    products: [
      {
        id: 201,
        name: 'Green Man Jacket',
        price: 49,
        quantity: 1,
        imageUrl: 'https://picsum.photos/id/1/200/300',
      },
    ],
  },
];

const PageCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const HandleCheckout = () => {
    const filteredCart = cart
      .map((store) => ({
        ...store,
        products: store.products.filter((product) =>
          selectedProducts.some(
            (item: any) =>
              item.storeId === store.id && item.productId === product.id
          )
        ),
      }))
      .filter((store) => store.products.length > 0); // Loại bỏ các store không có sản phẩm

    setCart(filteredCart);
    setCheckout(true); // Chuyển sang chế độ thanh toán
  };

  // Toggle chọn sản phẩm
  const toggleProductSelection = (storeId: any, productId: any) => {
    const selected = [...selectedProducts];
    const exists = selected.find(
      (item: any) => item.storeId === storeId && item.productId === productId
    );

    if (exists) {
      setSelectedProducts(
        selected.filter(
          (item: any) =>
            item.storeId !== storeId || item.productId !== productId
        )
      );
    } else {
      setSelectedProducts([...selected, { storeId, productId }]);
    }
  };

  // Cập nhật số lượng sản phẩm
  const updateProductQuantity = (storeId: any, productId: any, change: any) => {
    const updatedCart = cart.map((store) => {
      if (store.id === storeId) {
        const updatedProducts = store.products.map((product) => {
          if (product.id === productId) {
            const newQuantity = product.quantity + change;
            return {
              ...product,
              quantity: newQuantity > 0 ? newQuantity : 1,
            };
          }
          return product;
        });
        return { ...store, products: updatedProducts };
      }
      return store;
    });
    setCart(updatedCart);
  };

  const removeProduct = (storeId: any, productId: any) => {
    const updatedCart = cart.map((store) => {
      if (store.id === storeId) {
        const updatedProducts = store.products.filter(
          (product) => product.id !== productId
        );
        return { ...store, products: updatedProducts };
      }
      return store;
    });
    setCart(updatedCart.filter((store) => store.products.length > 0));
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cart.reduce((total, store) => {
      return (
        total +
        store.products.reduce(
          (storeTotal, product) =>
            selectedProducts.find(
              (item: any) =>
                item.storeId === store.id && item.productId === product.id
            )
              ? storeTotal + product.price * product.quantity
              : storeTotal,
          0
        )
      );
    }, 0);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8 font-[Roboto]">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>{' '}
        <p className="text-gray-600 text-base mb-4">
          {' '}
          Showing your selected products
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2">
            {checkout ? (
              <button
                onClick={() => {
                  setCheckout(false), setCart(initialCart);
                }}
                className="mb-6 text-green-600 text-lg"
              >
                {'<'} Back to cart
              </button>
            ) : (
              ''
            )}
            {cart.map((store) => (
              <div
                key={store.id}
                className="mb-6 bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold">{store.label}</h2>
                <div className="mt-4">
                  {store.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between border-b py-5"
                    >
                      <div className="flex items-center">
                        {!checkout ? (
                          <input
                            type="checkbox"
                            className="mr-4"
                            checked={selectedProducts.some(
                              (item: any) =>
                                item.storeId === store.id &&
                                item.productId === product.id
                            )}
                            onChange={() =>
                              toggleProductSelection(store.id, product.id)
                            }
                          />
                        ) : (
                          ''
                        )}
                        <div className="flex">
                          <img
                            src={product.imageUrl}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="pl-6">
                            <h3 className="text-lg font-medium">
                              {product.name}
                            </h3>
                            <p className="text-base text-green-600 font-semibold">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      {!checkout ? (
                        <div className="flex items-center">
                          <div className="border-2 justify-center flex items-center rounded-md h-12 w-28">
                            {' '}
                            {/* Tăng từ h-11 w-24 lên h-12 w-28 */}
                            <button
                              className="px-2 py-1 text-gray-600 text-xl hover:text-red-500"
                              onClick={() =>
                                updateProductQuantity(store.id, product.id, -1)
                              }
                            >
                              −
                            </button>
                            <span className="mx-2 text-lg">
                              {product.quantity}
                            </span>{' '}
                            <button
                              className="px-2 py-1 text-gray-600 text-xl hover:text-green-600"
                              onClick={() =>
                                updateProductQuantity(store.id, product.id, 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="ml-4 text-red-500 text-base hover:text-red-700"
                            onClick={() => removeProduct(store.id, product.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white w-96 h-[25rem] shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Product Summary</h2>
            <p className="text-base text-gray-600 mb-4">
              {selectedProducts.length === 0
                ? 'No products selected'
                : `${selectedProducts.length} products selected`}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <p className="flex justify-between text-base text-gray-700">
                <span>Total Price:</span>
                <span>${calculateTotal()}</span>
              </p>
              <p className="flex justify-between text-base text-gray-700">
                <span>Total Price (Discount):</span>
                <span>$0</span>
              </p>
              <p className="flex justify-between text-base text-gray-700">
                <span>Tax & Fee:</span>
                <span>$0</span>
              </p>
              <div className="Line4 w-80 h-px border border-[#e4e9ee]"></div>
              <div className="Frame206 w-80 h-7 justify-between items-start inline-flex">
                <div className="TotalPrice text-[#0b0f0e] text-xl font-semibold font-['Clash Grotesk'] leading-7">
                  Total Price
                </div>
                <div className="0 text-right text-[#0b0f0e] text-xl font-semibold font-['Clash Grotesk'] leading-7">
                  ${calculateTotal()}
                </div>
              </div>
            </div>
            <div className="mt-6">
              {!checkout ? (
                <button
                  onClick={() => HandleCheckout()}
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
                >
                  Order
                </button>
              ) : (
                <button
                  onClick={() => {}}
                  className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-lg"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="Line4 w-full mt-6 border border-[#e4e9ee]"></div>
      </div>

      {!checkout ? (
        <div className="RelateProduct mb-6">
          <h2 className="text-2xl font-bold ml-36 mb-6">Related Products</h2>

          <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[78rem]">
            {listProduct.slice(0, 4).map((product) => (
              <ContainProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
      <Footer />
    </>
  );
};

export default PageCart;
