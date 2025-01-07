'use client';
import { useEffect, useState } from 'react';
import Google from '../assets/icons/icons8-google.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const toastSuccess = () => {
  toast.success('Successfull!', {
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
const toastError = () => {
  toast.error('Failed, information incorrect', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  });
};

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

const RegisterBox = ({ setRegister, handleIsLogin }: any) => {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let validationErrors: any = {};

    if (!formData.username) {
      validationErrors.username = 'Username is required';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      let token = '';
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
          {
            username: formData.username,
            email: 'userTest@gmail.com',
            password: formData.password,
            Fname: 'Your First Name',
            LName: 'Your Last Name',
            phone_number: formData.phoneNumber,
            address: 'string',
            roles: 'user',
          }
        );
        console.log('response:', response.status);
        if (response.status === 201) {
          // Thực hiện các bước sau khi đăng ký thành công, ví dụ: lưu token vào localStorage
          token = response.data.token;
          localStorage.setItem('token', response.data.token);
          handleIsLogin(true);
          // Redirect hoặc xử lý logic sau khi đăng ký thành công
        }
      } catch (error) {
        console.error('Register failed:', error);
        toastError();
      } finally {
        setLoading(false);
      }
      if (!token) return;
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
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[poppins]">
    <div className="PopUp w-[28rem] h-[36rem] flex flex-col items-center gap-3 p-5 bg-white font-[poppins] rounded-lg shadow border border-[#e4e9ee]">
      <h2 className="SignIn w-full text-[#0b0f0e] text-3xl font-black leading-loose">
        <button
          className="active:scale-90 transition-transform duration-100 cursor-pointer"
          onClick={() => setRegister(false)}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="gray"
            className="relative pl-4 mr-28 text-2xl hover:text-blue-500"
          />
        </button>
        Sign Up
      </h2>
      <form className="pl-2.5 flex-col" onSubmit={handleSubmit}>
        <div className="Form w-96 h-20 flex-col justify-center items-start gap-2 inline-flex relative">
          <label className="HolderName text-[#0b0f0e] text-base font-extrabold leading-snug">
            Username
            {errors.username && (
              <p className="absolute text-red-500 text-sm left-0">
                {errors.username}
              </p>
            )}
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
          />
        </div>
        <div className="user-box w-96 h-20 flex-col justify-center items-start gap-2 inline-flex relative">
          <label className="text-[#0b0f0e] text-base font-semibold leading-snug">
            PhoneNumber
            {errors.phoneNumber && (
              <p className="absolute text-red-500 text-sm left-0">
                {errors.phoneNumber}
              </p>
            )}
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phoneNumber"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
          />
        </div>
        <div className="user-box w-96 h-20 flex-col justify-center items-start gap-2 inline-flex relative">
          <label className="text-[#0b0f0e] text-base font-semibold leading-snug">
            Password
            {errors.password && (
              <p className="absolute text-red-500 text-sm left-0">
                {errors.password}
              </p>
            )}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
          />
        </div>
        <div className="user-box w-96 h-20 flex-col justify-center items-start gap-2 inline-flex relative">
          <label className="text-[#0b0f0e] text-base font-semibold leading-snug">
            Confirm Password
            {errors.confirmPassword && (
              <p className="absolute text-red-500 text-sm left-0">
                {errors.confirmPassword}
              </p>
            )}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
          />
        </div>
        <div className="Line16 w-96 mt-3 h-px border border-[#e4e9ee]"></div>
        <button
          type="submit"
          className="SearchSomething mt-4 text-center text-white text-base font-semibold leading-snug w-96 h-12 px-2.5 py-2.5 bg-[#1e4c2f] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#145d39] focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
          {loading ? 'Sign Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
    // </div>
  );
};

const LoginBox = ({ setRegister, handleIsLogin }: any) => {
  // State to store account and password information
  const [metadata, setMetadata] = useState({
    account: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  // Handle input change to update state
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({
      ...prev,
      [name]: value, // Dynamically set account or password based on the name attribute
    }));
  };

  const googleLogin = async () => {
    const googleLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    window.location.href = googleLoginUrl; // Chuyển hướng đến Google OAuth
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent page reload on form submission
    setLoading(true);
    console.log('Account:', metadata.account);
    console.log('Password:', metadata.password);
    let token = '';

    if (metadata.account.includes('@')) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
          {
            email: metadata.account,
            password: metadata.password,
          }
        );
        console.log('response:', response);
        if (response.status === 201) {
          // Thực hiện các bước sau khi đăng nhập thành công, ví dụ: lưu token vào localStorage
          localStorage.setItem('token', response.data.token);
          token = response.data.token;
          handleIsLogin(true);
          // Redirect hoặc xử lý logic sau khi login thành công
        }
      } catch (error) {
        // Xử lý lỗi khi login thất bại
        console.error('Login failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
          {
            username: metadata.account,
            password: metadata.password,
          }
        );
        console.log('response:', response);

        if (response.status === 201) {
          // Thực hiện các bước sau khi đăng nhập thành công, ví dụ: lưu token vào localStorage
          token = response.data.token;

          localStorage.setItem('token', response.data.token);
          handleIsLogin(true);
          // Redirect hoặc xử lý logic sau khi login thành công
        }
      } catch (error) {
        // Xử lý lỗi khi login thất bại
        toastError();
        console.error('Login failed:', error);
      } finally {
        setLoading(false);
      }
    }
    if (!token) return;
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
    setMetadata({
      account: '',
      password: '',
    });
  };

  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="PopUp w-[28rem] h-[29rem] flex flex-col items-center gap-3 p-5 font-[poppins] bg-white rounded-lg shadow border border-[#e4e9ee]">
        <h2 className="SignIn text-[#0b0f0e] text-3xl font-black leading-loose">
          Sign In
        </h2>
        <form className="pl-2.5" onSubmit={handleSubmit}>
          <div className="Form w-96 h-20 flex-col justify-center items-start gap-2 inline-flex">
            <label className="HolderName text-[#0b0f0e] text-base font-extrabold leading-snug">
              Username or email
            </label>
            <input
              type="text"
              name="account" // Bind this input to "account"
              value={metadata.account}
              onChange={handleInputChange} // Update state on input change
              placeholder="Enter your username or email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
            />
          </div>
          <div className="user-box w-96 h-20 flex-col justify-center items-start gap-2 inline-flex">
            <label className="text-[#0b0f0e] text-base font-semibold leading-snug">
              Password
            </label>
            <input
              type="password"
              name="password" // Bind this input to "password"
              value={metadata.password}
              onChange={handleInputChange} // Update state on input change
              placeholder="Enter your password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-300"
            />
          </div>
          <div className="flex justify-between w-96 h-8 pl-1 pr-4">
            <button
              type="button"
              className="createAcc text-[#0b0f0e] text-base font-semibold leading-snug active:scale-90 transition-transform duration-100 cursor-pointer hover:text-blue-400 underline"
            >
              Forgot password?
            </button>
            <button
              onClick={() => setRegister(true)}
              type="button"
              className="createAcc text-[#0b0f0e] text-base font-semibold leading-snug active:scale-90 transition-transform duration-100 cursor-pointer hover:text-blue-400 underline"
            >
              Sign Up
            </button>
          </div>
          <button
            type="submit"
            className="SearchSomething text-center text-white text-base font-semibold leading-snug w-96 h-12 px-2.5 py-2.5 bg-[#1e4c2f] rounded-lg justify-center items-center gap-2.5 inline-flex hover:bg-[#145d39] focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="SearchSomething text-center pt-1 text-[#808b9c] text-sm font-medium leading-snug">
          Or using other method
        </div>
        <button className="Frame277 w-96 h-12 mt-2 py-3 rounded-lg border border-[#e4e9ee] justify-center items-center gap-2.5 inline-flex hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <div
            onClick={googleLogin}
            className="Frame278 justify-start items-center gap-2 flex"
          >
            <div className="Facebook w-6 h-8 pt-1">
              <Google />
            </div>
            <div className="SearchSomething text-center text-[#0b0f0e] text-base font-semibold leading-relaxed">
              Sign In with Google
            </div>
          </div>
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

const AuthLogin = ({ handleIsLogin }: any) => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
      <div>
        {!isRegister ? (
          <LoginBox setRegister={setIsRegister} handleIsLogin={handleIsLogin} />
        ) : (
          <RegisterBox
            setRegister={setIsRegister}
            handleIsLogin={handleIsLogin}
          />
        )}
      </div>
    </>
  );
};

export default AuthLogin;
