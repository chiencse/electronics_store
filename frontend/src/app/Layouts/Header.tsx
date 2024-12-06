import React from 'react';
import HeaderUser from './HeaderUser';
import HeaderAdmin from './HeaderAdmin';
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

  return <>{decode?.role === 'admin' ? <HeaderAdmin /> : <HeaderUser/>}</>;
};

export default Header;
