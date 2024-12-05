'use client';
import {
  faBars,
  faCartShopping,
  faCarTunnel,
  faHamburger,
  faMagnifyingGlass,
  faPerson,
  faUser,
  faMobileAlt,
  faLaptop,
  faHeadphones,
  faStopwatch,
  faHome,
  faKeyboard,
  faTv,
  faRecycle,
  faTags,
  faNewspaper,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { navbarLogin } from '../../data/navbar';
import AuthLogin from '@/app/components/Login-box';
import { Bounce, toast } from 'react-toastify';
import { decodeJWT } from '../utils/decodeJwt';
import logoBK from '../assets/hcmut.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const categories = [
  { name: 'Phone, Tablet', icon: faMobileAlt },
  { name: 'Laptop', icon: faLaptop },
  { name: 'Audio', icon: faHeadphones },
  { name: 'Watches, Camera', icon: faCamera },
  { name: 'Home Appliances', icon: faHome },
  { name: 'Accessories', icon: faKeyboard },
  { name: 'PC, Monitors, Printers', icon: faLaptop },
  { name: 'TV', icon: faTv },
  { name: 'Trade-In Deals', icon: faRecycle },
  { name: 'Used Goods', icon: faTags },
  { name: 'Promotions', icon: faTags },
  { name: 'Tech News', icon: faNewspaper },
];

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
const checkLoggedIn = () => {
  const token = localStorage.getItem('token');
  const decode = decodeJWT(token);
  return decode;
};
const HeaderUser = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState<any>({});
  const router = useRouter();
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    const check = checkLoggedIn();
    if (check?.role === 'admin') {
      router.push('/admin');
    }
    if (check) {
      setIsLoggedIn(true);
      setDataUser(check);
    }
  }, []);

  const handleIsLogin = (value: any) => {
    if (value) {
      setIsLoggedIn(true);
      toastSuccess();
    }
  };

  const handleCheckLogin = () => {
    if (isLoggedIn) return;
    setIsLoggedIn(false);
    setShowPopup(true);
  };
  const handleIsLogout = () => {
    setIsLoggedIn(false);
    setShowPopup(false);
    setDataUser({});
    toastSuccess();
    localStorage.removeItem('token');
    Cookies.remove('token');
  };
  return (
    <>
      <div className="Navbar  px-20 w-full h-16 flex flex-row items-center gap-3 justify-between font-[Roboto] bg-white border-b border-[#e4e9ee]">
        <Link
          href="/"
          className="Logo pl-10 h-8 justify-start items-center gap-2 inline-flex"
        >
          <div className="Frame162649 w-8 h-8 relative rounded-lg">
            <div className="Rectangle588 w-8 h-8 left-0 top-0">
              <Image src={logoBK} alt="logoBK" />
            </div>
            <div className="Frame162650 w-4 h-4 left-[7px] top-[8px] absolute" />
          </div>
          <div className="Lenny text-[#0b0f0e] text-2xl font-semibold font-['Clash Grotesk'] leading-7">
            eBKstore
          </div>
        </Link>

        <div className="form-control flex flex-row w-full max-w-lg gap-1">
          <div className="dropdown dropdown-hover ">
            <label
              tabIndex={0}
              className="btn btn-sm bg-white text-black border border-gray-300 flex items-center gap-2"
            >
              <span className="hidden sm:inline">All Categories</span>
              <FontAwesomeIcon icon={faBars} size="sm" color="grey" />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-white border border-gray-300 rounded-md text-sm"
            >
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center hover:text-black cursor-pointer"
                >
                  <div className="w-full flex items-center">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="w-5 h-5 mr-2 flex-shrink-0"
                    />
                    <span className="inline whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <label className="input input-bordered input-sm flex items-center gap-2 flex-grow">
            <input
              type="text"
              placeholder="Search for products..."
              className=" w-full bg-white text-black"
            />

            <FontAwesomeIcon
              className="hover:text-blue-500"
              icon={faMagnifyingGlass}
              size="sm"
            />
            {/* 🔍 */}
          </label>
        </div>

        <div className="NavbarLinks flex flex-row gap-5 justify-end items-center mr-5">
          {navbarLogin.map((item, index) => (
            <button
              id="index"
              onClick={handleCheckLogin}
              key={index}
              className="active:scale-90 transition-transform duration-150 cursor-pointer"
            >
              <span>
                <FontAwesomeIcon
                  className="hover:text-blue-500"
                  icon={item.icon}
                  size="lg"
                  color="grey"
                />
              </span>
            </button>
          ))}
          <div className="ProfileLink text-[#0b0f0e] flex flex-row items-center justify-between text-sm font-medium">
            <div className="Line1 w-6 mr-4 rotate-90 border border-[#75797d]"></div>
            <div
              onClick={togglePopup}
              className="ProfileAvatar w-10 h-10 rounded-full bg-[#f5f5f5] flex justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} size="lg" color="grey" />
            </div>
            {dataUser && (
              <p className="pl-4 text-base">
                {dataUser.username ? dataUser.username : dataUser.FName}
              </p>
            )}
          </div>
          {showPopup && isLoggedIn && (
            <div className="absolute top-14 right-0 w-96 bg-white shadow-lg rounded-lg p-6 z-50">
              <Link
                href="/user"
                className="flex items-center mb-4  cursor-pointer"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {dataUser.username ? dataUser.username : dataUser.FName}
                  </h3>
                  <p className="text-sm text-gray-500">Platinum Member</p>
                </div>
              </Link>

              <div className="border-b mb-4"></div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Wallet</h4>
                <div className="flex justify-between text-sm mt-2">
                  <span>Coins:</span>
                  <span>0.092</span>
                </div>
              </div>

              <div className="border-b mb-4"></div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Menu</h4>
                <ul className="mt-2 text-sm">
                  <li className="mb-2 cursor-pointer hover:underline">
                    ListOrder
                  </li>
                  <li className="mb-2 cursor-pointer hover:underline">
                    Settings
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleIsLogout()}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        {showPopup && !isLoggedIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
              <AuthLogin handleIsLogin={handleIsLogin} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderUser;
