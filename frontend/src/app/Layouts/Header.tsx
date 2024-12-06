import React from 'react';
import HeaderUser from './HeaderUser';
import HeaderAdmin from './HeaderAdmin';
import { decodeJWT } from '../utils/decodeJwt';
import { cookies } from 'next/headers';
const Header = () => {
  const cookieStore = cookies(); 
  const token = cookieStore.get('token')?.value;
  const decode = decodeJWT(token);

  return <>{decode?.role === 'admin' ? <HeaderAdmin /> : <HeaderUser/>}</>;
};
export default Header;
