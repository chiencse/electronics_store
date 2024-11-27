'use client';

import { useState } from 'react';
import Google from '../app/assets/icons/icons8-google.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RegisterBox = ({ setRegister }: any) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = 'Username is required';
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
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
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[poppins]">
      <div className="PopUp w-[28rem] h-[38rem] flex flex-col items-center gap-3 p-5 bg-white rounded-lg shadow border border-[#e4e9ee]">
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
              Email
              {errors.email && (
                <p className="absolute text-red-500 text-sm left-0">
                  {errors.email}
                </p>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
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
            Sign Up
          </button>
        </form>
        <div className="SearchSomething text-center text-[#808b9c] text-sm font-medium leading-snug">
          Or
        </div>
        <button className="Frame277 w-96 h-12 py-3 rounded-lg border border-[#e4e9ee] justify-center items-center gap-2.5 inline-flex hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <div className="Frame278 justify-start items-center gap-2 flex">
            <div className="Facebook w-6 h-8 pt-1">
              <Google />
            </div>
            <div className="SearchSomething text-center text-[#0b0f0e] text-base font-semibold leading-relaxed">
              Sign In with Google
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

const LoginBox = ({ setRegister }: any) => {
  // State to store account and password information
  const [metadata, setMetadata] = useState({
    account: '',
    password: '',
  });

  // Handle input change to update state
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({
      ...prev,
      [name]: value, // Dynamically set account or password based on the name attribute
    }));
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent page reload on form submission
    console.log('Account:', metadata.account);
    console.log('Password:', metadata.password);

    // Add your logic here (e.g., API call to sign in)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[poppins]">
      <div className="PopUp w-[28rem] h-[29rem] flex flex-col items-center gap-3 p-5 bg-white rounded-lg shadow border border-[#e4e9ee]">
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
              placeholder="Enter your phone number or email"
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
            Sign In
          </button>
        </form>
        <div className="SearchSomething text-center pt-1 text-[#808b9c] text-sm font-medium leading-snug">
          Or using other method
        </div>
        <button className="Frame277 w-96 h-12 mt-2 py-3 rounded-lg border border-[#e4e9ee] justify-center items-center gap-2.5 inline-flex hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <div className="Frame278 justify-start items-center gap-2 flex">
            <div className="Facebook w-6 h-8 pt-1">
              <Google />
            </div>
            <div className="SearchSomething text-center text-[#0b0f0e] text-base font-semibold leading-relaxed">
              Sign In with Google
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

const AuthLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {!isRegister ? (
        <LoginBox setRegister={setIsRegister} />
      ) : (
        <RegisterBox setRegister={setIsRegister} />
      )}
    </div>
  );
};

export default AuthLogin;