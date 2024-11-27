import {
  faCartShopping,
  faCarTunnel,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { navbarLogin } from '../data/navbar';

const Header = () => {
  return (
    <div className="Navbar px-20 w-full h-20 flex flex-row items-center gap-3 justify-between bg-white border-b border-[#e4e9ee]">
      <div className="Logo pl-10 h-8 justify-start items-center gap-2 inline-flex">
        <div className="Frame162649 w-8 h-8 relative rounded-lg">
          <div className="Rectangle588 w-8 h-8 left-0 top-0 absolute bg-[#1e4c2f]" />
          <div className="Frame162650 w-4 h-4 left-[7px] top-[8px] absolute" />
        </div>
        <Link
          href="/"
          className="Lenny text-[#0b0f0e] text-2xl font-semibold font-['Clash Grotesk'] leading-7"
        >
          eBKstore
        </Link>
      </div>

      <div className="SearchBar w-[50%] h-11 flex flex-row justify-center items-center bg-[#f5f5f5] rounded-lg">
        <div className="SearchIcon w-4 h-4 ml-2" />
        <input
          type="text"
          placeholder="Search for products..."
          className="SearchInput w-[90%] h-8 ml-2 bg-[#f5f5f5] text-black outline-none"
        />
        <button className="px-4 py-4 active:scale-90 transition-transform duration-150 cursor-pointer">
          <FontAwesomeIcon
            className="hover:text-blue-500"
            icon={faMagnifyingGlass}
            size="xl"
            color="black"
          />
        </button>
      </div>

      <div className="NavbarLinks flex flex-row gap-5 justify-end items-center mr-10">
        {navbarLogin.map((item, index) => (
          <button
            id="index"
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
          <div className="ProfileAvatar w-10 h-10 rounded-full bg-[#f5f5f5] flex justify-center items-center">
            {/* Check image when authidenicated */}
            <image></image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
