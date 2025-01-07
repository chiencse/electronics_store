import React from 'react';
import HeaderUser from './HeaderUser';
import HeaderAdmin from './HeaderAdmin';
import { decodeJWT } from '../utils/decodeJwt';
import logoBK from '../assets/hcmut.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
const Header = () => {
  const cookieStore = cookies(); // Get the cookies object
  const token = cookieStore.get('token')?.value; // Access a specific cookie
  const decode = decodeJWT(token);

  return <>{decode?.role === 'admin' ? <HeaderAdmin /> : <HeaderUser />}</>;
};

export default Header;
