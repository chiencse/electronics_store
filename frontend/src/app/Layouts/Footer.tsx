import React from 'react';
import FooterUSer from './FooterUser';
import FooterAdmin from './FooterAdmin';
import { decodeJWT } from '../utils/decodeJwt';
import { cookies } from 'next/headers';
const Footer = () => {
  const cookieStore = cookies(); // Get the cookies object
  const token = cookieStore.get('token')?.value; // Access a specific cookie
  const decode = decodeJWT(token);

  return <>{decode?.role === 'user' ? <FooterUSer /> : <FooterAdmin />}</>;
};
export default Footer;
