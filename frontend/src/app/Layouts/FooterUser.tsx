import Image from 'next/image';
import React from 'react';
import LogoBK from '../assets/hcmut.png';

const FooterUser = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-8 pb-8">
      <div className="container mx-auto px-6 w-full lg:w-[82rem]">
        {/* Footer Section */}
        <div className=" border-gray-300 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer Logo & Description */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center">
                  <Image src={LogoBK} alt="logo" className="w-12 h-12" />
                </div>
                <span className="text-2xl font-bold text-gray-900">eBKstore</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your go-to e-commerce platform for all your needs. Experience seamless shopping and exceptional service.
              </p>
            </div>

            {/* Footer Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-gray-800 cursor-pointer">Information</li>
                <li className="hover:text-gray-800 cursor-pointer">Store Locator</li>
                <li className="hover:text-gray-800 cursor-pointer">Bulk Purchase</li>
                <li className="hover:text-gray-800 cursor-pointer">Alteration Services</li>
                <li className="hover:text-gray-800 cursor-pointer">Gift Delivery Service</li>
                <li className="hover:text-gray-800 cursor-pointer">Live Station</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Customer Support</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-gray-800 cursor-pointer">FAQ</li>
                <li className="hover:text-gray-800 cursor-pointer">Return Policy</li>
                <li className="hover:text-gray-800 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-gray-800 cursor-pointer">Accessibility</li>
                <li className="hover:text-gray-800 cursor-pointer">Contact Us</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-gray-800 cursor-pointer">Membership</li>
                <li className="hover:text-gray-800 cursor-pointer">Address</li>
                <li className="hover:text-gray-800 cursor-pointer">Coupons</li>
              </ul>
              <h4 className="font-semibold text-gray-900 mt-8 mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-gray-800 cursor-pointer">
                  Consumer Complaint Service
                </li>
                <li className="text-gray-600">
                  268 Ly Thuong Kiet, District 10, Ho Chi Minh
                </li>
                <li className="hover:text-gray-800 cursor-pointer">CSE Faculty</li>
                <li className="hover:text-gray-800 cursor-pointer">1234567</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-xs">
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
      </div>
    </footer>
  );
};

export default FooterUser;
