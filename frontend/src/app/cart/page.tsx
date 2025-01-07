'use client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ContainProduct from '../landing/components/containProduct';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import Swal from 'sweetalert2';
const DiscountNumber = 0.95;

const showAlertorder = () => {
  Swal.fire({
    title: 'Success!',
    text: 'Your Order Successfully!',
    icon: 'success',
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  });
};

const toastSuccess = (message: string) => {
  toast.success(message, {
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
const toastError = (message: string) => {
  toast.error(message, {
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

const PageCart = () => {
  const [cart, setCart] = useState([]);
  const [initialCart, setInitialCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState([]);
  const [listDiscount, setListDiscount] = useState([]);
  const [relateProduct, setRelateProduct] = useState([]);
  const [selectDiscount, setSelectDiscount] = useState(null);
  const [optionOrder, setOptionOrder] = useState({
    status: 'pending',
    comments: '',
    totalPrice: 0,
    address: '',
    orderIdd: 0,
    payment: '',
  });

  const handleOptionOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Truy xuất name và value
    setOptionOrder((prevDate) => ({
      ...prevDate,
      [name]: value, // Cập nhật theo name và value
    }));
  };

  const HandleCheckout = async () => {
    const filteredCart = cart.filter((product) =>
      selectedProducts.includes(product.cartProduct_variantId)
    );
    setCart(filteredCart);
    setCheckout(true);

    try {
      const res = await axios.get(
        'http://localhost:3001/discount/d3218648-05b9-ef11-88f8-000d3a80421a',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        setDiscount(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }

    try {
      const res = await axios.get('http://localhost:3001/discount', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        setListDiscount(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const getRelateProduct = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/product/getAllProduct?page=1&take=5',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setRelateProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Gọi API để lấy giỏ hàng từ server
        const response = await axios.get('http://localhost:3001/cart/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('response:', response.data);
        if (response.status === 200) {
          setCart(response.data);
          setInitialCart(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    getRelateProduct();
    fetchCart();
  }, []);

  const VNpay = async (orderIdd: any) => {
    try {
      // Thực hiện request đến API
      const response = await axios.post('http://localhost:3001/payment/vnpay', {
        orderId: orderIdd,
        amount: calculateTotal(),
        orderDescription: `Thanh toán đơn hàng ${orderIdd}`,
      });

      // Lấy paymentUrl từ response
      const { paymentUrl } = response.data;

      // Chuyển hướng đến VNPay
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Đã xảy ra lỗi khi tạo thanh toán. Vui lòng thử lại!');
    }
  };

  const createPayment = async () => {
    if (!optionOrder.address) {
      toastError('Please enter your address!');
      return;
    }
    if (!optionOrder.payment) {
      toastError('Please select payment method!');
      return;
    }

    setLoading(true);
    const selectedAttributes = cart.map(
      ({ cartProduct_quantity, cartProduct_variantId, product_id }) => ({
        quantity: cartProduct_quantity,
        variantId: cartProduct_variantId,
        productId: product_id,
      })
    );
    console.log('selectedAttributes:', selectedAttributes);
    try {
      // Tính tổng tiền
      const totalPrice = calculateTotalDiscount();
      const orderIdd = await axios.get(
        'http://localhost:3001/order/maxOrderIdd',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('orderIdd:', orderIdd.data.data);
      // Gọi API để tạo thanh toán
      const response = await axios.post(
        'http://localhost:3001/order/create',
        {
          listProduct: selectedAttributes,
          totalPrice: totalPrice,
          status: 'pending',
          comments: optionOrder.comments,
          address: optionOrder.address,
          orderIdd: orderIdd.data.data,
          discountId: selectDiscount?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('response:', response.data);
      toastSuccess('Đã tạo đơn hàng thành công!');
      if (optionOrder.payment === 'VNPay') {
        await VNpay(orderIdd.data.data);
        setLoading(false);
      } else {
        showAlertorder();
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toastError('Đã xảy ra lỗi khi tạo thanh toán. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Toggle chọn sản phẩm
  const toggleProductSelection = (variantId: string) => {
    const selected = [...selectedProducts];
    const exists = selected.includes(variantId);

    if (exists) {
      setSelectedProducts(selected.filter((id) => id !== variantId));
    } else {
      setSelectedProducts([...selected, variantId]);
    }
  };

  const apiDeleteCart = async (variantId: string, product_id: string) => {
    try {
      // Gọi API để xóa sản phẩm khỏi giỏ hàng
      const response = await axios.delete('http://localhost:3001/cart/delete', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: {
          variantId: variantId,
          productId: product_id,
        },
      });
      console.log('response:', response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  const apiInsertCart = async (variantId: string, product_id: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          productId: product_id,
          variantId: variantId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error(
        'Error adding to cart:',
        error.response?.data || error.message
      );
    }
  };
  const handleRemove = async (variantId: string, product_id: string) => {
    try {
      // Gọi API để xóa sản phẩm khỏi giỏ hàng
      const response = await axios.delete(
        'http://localhost:3001/cart/deleteAll',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          data: {
            variantId: variantId,
            productId: product_id,
          },
        }
      );
      console.log('response:', response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  // Cập nhật số lượng sản phẩm
  const updateProductQuantity = async (variantId: string, change: number) => {
    setLoading(true);

    // Sử dụng Promise.all để chờ tất cả các tác vụ bất đồng bộ hoàn thành
    const updatedCart = await Promise.all(
      cart.map(async (product: any) => {
        if (product.cartProduct_variantId === variantId) {
          const newQuantity = product.cartProduct_quantity + change;

          // Thực hiện hành động thêm/xóa giỏ hàng
          if (change === -1 && newQuantity > 0) {
            await apiDeleteCart(variantId, product.product_id);
          }
          if (change === 1) {
            await apiInsertCart(variantId, product.product_id);
          }

          // Cập nhật số lượng
          return {
            ...product,
            cartProduct_quantity: newQuantity > 0 ? newQuantity : 1,
          };
        }
        return product;
      })
    );

    // Sau khi xử lý xong, cập nhật lại trạng thái giỏ hàng
    console.log('updatedCart:', updatedCart);
    setCart(updatedCart);
    setLoading(false);
  };

  const removeProduct = async (variantId: string) => {
    await cart.map(async (product: any) => {
      if (product.cartProduct_variantId === variantId) {
        await handleRemove(variantId, product.product_id);
      }
    });

    const updatedCart = cart.filter(
      (product) => product.cartProduct_variantId !== variantId
    );
    setCart(updatedCart);
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cart?.reduce((total, product) => {
      if (selectedProducts.includes(product.cartProduct_variantId)) {
        return (
          total +
          product.ProductVariant_price *
            product.cartProduct_quantity *
            DiscountNumber
        );
      }
      return total;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!selectDiscount) return 0;
    if (selectDiscount.discountType === 'percentage') {
      return calculateTotal() * (selectDiscount.discountPercentage / 100) >=
        selectDiscount.valueMax
        ? selectDiscount.valueMax
        : calculateTotal() * (selectDiscount.discountPercentage / 100);
    } else {
      return selectDiscount.amountDiscount;
    }
  };

  const calculateTotalDiscount = () => {
    return calculateTotal() - calculateDiscount();
  };

  return (
    <>
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
            {cart &&
              cart.map((product) => (
                <div
                  key={product.cartProduct_variantId}
                  className="flex items-center justify-between border-b py-5"
                >
                  <div className="flex items-center">
                    {!checkout ? (
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={selectedProducts.includes(
                          product.cartProduct_variantId
                        )}
                        onChange={() =>
                          toggleProductSelection(product.cartProduct_variantId)
                        }
                      />
                    ) : null}
                    <div className="flex">
                      <img
                        src={product.ImageProduct_imageUrl} // Thay bằng URL thực
                        alt={product.product_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="pl-6">
                        <h3 className="text-lg font-medium">
                          {product.product_name}
                        </h3>
                        <p className="text-base text-gray-600">
                          {product?.ProductVariant_color},{' '}
                          {product?.ProductVariant_ram}GB RAM,{' '}
                          {product?.ProductVariant_rom}GB ROM
                        </p>
                        <p className="text-base text-green-600 font-semibold">
                          {(
                            product.ProductVariant_price * DiscountNumber
                          ).toLocaleString()}
                          ₫
                        </p>
                      </div>
                    </div>
                  </div>
                  {!checkout ? (
                    <div className="flex items-center">
                      <div className="border-2 justify-center flex items-center rounded-md h-12 w-28">
                        <button
                          className="px-2 py-1 text-gray-600 text-xl hover:text-red-500"
                          onClick={() =>
                            updateProductQuantity(
                              product.cartProduct_variantId,
                              -1
                            )
                          }
                        >
                          −
                        </button>
                        <span className="mx-2 text-lg">
                          {product.cartProduct_quantity}
                        </span>
                        <button
                          className="px-2 py-1 text-gray-600 text-xl hover:text-green-600"
                          onClick={() =>
                            updateProductQuantity(
                              product.cartProduct_variantId,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="ml-4 text-red-500 text-base hover:text-red-700"
                        onClick={() =>
                          removeProduct(product.cartProduct_variantId)
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ) : (
                    <span className="mx-2 text-lg">
                      SL: {product.cartProduct_quantity}
                    </span>
                  )}
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
                <span>${calculateTotal().toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-base text-gray-700">
                <span>Total Price (Discount):</span>
                <span>{calculateDiscount().toLocaleString()}</span>
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
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(calculateTotalDiscount())}
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
                  onClick={() => {
                    createPayment();
                  }}
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
            {relateProduct.slice(0, 4).map((product) => (
              <ContainProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <div className="rounded-box w-[30vw] flex-grow ml-28 mx-auto py-8 font-[Roboto]">
            <div className="mt-6 w-3/4">
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-600"
                >
                  Full Address:
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleOptionOrder}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  placeholder="Enter your full address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm text-gray-600">
                  Note:
                </label>
                <input
                  type="text"
                  name="comments"
                  onChange={handleOptionOrder}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  placeholder="Enter your Notice"
                />
              </div>
            </div>
            {/* Ô chọn phương thức thanh toán */}
            <div className="mt-6 ">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="vnpay"
                  name="payment"
                  className="cursor-pointer"
                  checked={optionOrder.payment === 'VNPay'}
                  onChange={handleOptionOrder} // Không cần bọc thêm function
                  value="VNPay"
                />
                <label htmlFor="vnpay" className="cursor-pointer">
                  VNPay
                </label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="cursor-pointer"
                  checked={optionOrder.payment === 'COD'}
                  onChange={handleOptionOrder}
                  value="COD"
                />
                <label htmlFor="cod" className="cursor-pointer">
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="rounded-box w-[50vw] flex-grow grid place-items-center">
            <div className="container mx-auto px-4 py-8 pr-10">
              <h1 className="text-3xl font-bold text-center mb-8">
                Available Discounts
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listDiscount.map((discount) => (
                  <div
                    onClick={() => setSelectDiscount(discount)}
                    key={discount.id}
                    className={`bg-white shadow-md rounded-lg p-6 transition-transform transform cursor-pointer hover:scale-105 ${
                      selectDiscount?.id === discount.id
                        ? 'border-4 border-blue-500'
                        : 'border border-gray-200'
                    }`}
                  >
                    <h2 className="text-xl font-bold text-blue-600 mb-2">
                      {discount.discountCode}
                    </h2>
                    <p className="text-gray-700 mb-4">{discount.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>
                        <span className="font-semibold">Type: </span>
                        {discount.discountType === 'percentage'
                          ? `${discount.discountPercentage}%`
                          : `${new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(discount.amountDiscount)}`}
                      </p>
                      <p>
                        <span className="font-semibold">Max Value: </span>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(discount.valueMax)}
                      </p>
                      <p>
                        <span className="font-semibold">Start Date: </span>
                        {new Date(discount.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-semibold">End Date: </span>
                        {new Date(discount.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-semibold">Points Required: </span>
                        {discount.points_required}
                      </p>
                      <p
                        className={`font-bold ${
                          discount.isActive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {discount.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageCart;
