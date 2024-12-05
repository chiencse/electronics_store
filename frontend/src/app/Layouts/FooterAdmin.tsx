import { decodeJWT } from './app/utils/decodeJwt';

import Image from 'next/image';
import React from 'react';
import LogoBK from '../assets/hcmut.png';

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-6 w-full lg:w-[82rem]">
        {/* Footer Section */}
        
            

          {/* Bottom Section */}
          <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-black text-sm">
            <p>COPYRIGHT © eBKstore CO, LTD. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-gray-800 cursor-pointer">
                Terms of Use
              </span>
              <span className="hover:text-gray-800 cursor-pointer">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
     
    </footer>
  );
};

export default Footer;
