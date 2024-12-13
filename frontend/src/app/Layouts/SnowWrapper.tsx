'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { Snowfall } from 'react-snowfall';

interface SnowWrapperProps {
  children: React.ReactNode;
}

const SnowWrapper: React.FC<SnowWrapperProps> = ({ children }) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const snowflake1 = document.createElement("img");
        snowflake1.src = "/assets/clipart568454.png";
    
        const snowflake2 = document.createElement("img");
        snowflake2.src = "/assets/winter-snowcrystal-001.png";
    
        // Set the images in the state
        setImages([snowflake1, snowflake2]);
      }, []);
  return (
    <div>
      <Snowfall snowflakeCount={80}
        images={images}
        wind={[0, 1]}
        radius={[1, 40]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }} />
       
        {children}
    </div>
    );
};

export default SnowWrapper;