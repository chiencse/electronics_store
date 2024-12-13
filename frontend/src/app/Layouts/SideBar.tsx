'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { decodeJWT } from '../utils/decodeJwt';
import Link from 'next/link';
import { FiGrid, FiSettings } from 'react-icons/fi';
import { AiOutlineProduct, AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';
import logoBK from '../assets/hcmut.png';
import Snowfall from 'react-snowfall';

interface SideBarProps {
  children: ReactNode;
}




const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  

  const [images, setImages] = useState([]);

  useEffect(() => {
    const snowflake1 = document.createElement("img");
    snowflake1.src = "/assets/clipart568454.png";

    const snowflake2 = document.createElement("img");
    snowflake2.src = "/assets/winter-snowcrystal-001.png";

    // Set the images in the state
    setImages([snowflake1, snowflake2]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeJWT(token);
      setRole(decoded?.role || null);
    }
  }, []);

  if (role === 'user') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-row">
      {/* Sidebar Content */}
      <aside
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={`${
          isCollapsed ? 'w-14 ' : 'w-[12vw] '
        } shadow-lg transition-all duration-500 flex flex-col gap-2 items-center justify-start rounded-lg  `}
      >
        {/* Logo Section */}
        <button
          className="group rounded-lg w-full transition-all duration-500 hover:bg-gray-100 p-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <div className="flex items-center justify-center w-full transition-all duration-500">
              <Image src={logoBK} alt="logoBK" className="w-8 h-8" />
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-start w-full transition-all duration-500">
              <Image src={logoBK} alt="logoBK" className="w-8 h-8" />
              <span className="flex-grow text-center font-semibold text-xl group-hover:text-gray-800">
                eBkStore
              </span>
            </div>
          )}
        </button>
        {/* Navigation Links */}
        <div className="flex flex-col gap-1  w-full">
          <Link
            href="/product"
            className="p-3 flex items-center justify-center  text-gray-600 hover:text-blue-500 hover:bg-gray-100  transition-all duration-500"
          >
            <AiOutlineProduct className="w-6 h-6 text-lg" />
            {!isCollapsed && (
              <span className="ml-2 flex-grow text-left font-semibold  ">
                Product
              </span>
            )}
          </Link>
          <Link
            href="/accounts"
            className="p-3 flex items-center justify-center  text-gray-600 hover:text-blue-500 hover:bg-gray-100  transition-all duration-500"
          >
            <AiOutlineUser className="w-6 h-6 text-lg" />
            {!isCollapsed && (
              <span className="ml-2 flex-grow text-left font-semibold  ">
                User Management
              </span>
            )}
          </Link>
          <Link
            href="/settings"
            className="p-3 flex items-center justify-center  text-gray-600 hover:text-blue-500 hover:bg-gray-100  transition-all duration-500"
          >
            <FiSettings className=" w-6 h-6 text-lg" />
            {!isCollapsed && (
              <span className="ml-2 flex-grow text-left font-semibold  ">
                Settings
              </span>
            )}
          </Link>
        </div>
      </aside>
      {/* Main Content */}
      <Snowfall
        snowflakeCount={200}
        images={images}
        wind={[0, 1]}
        radius={[1, 40]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }}
      />

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default SideBar;
