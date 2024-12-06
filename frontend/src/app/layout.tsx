import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import CSS
import Header from '@/app/Layouts/Header';
import Footer from '@/app/Layouts/Footer';
import { ToastContainer } from 'react-toastify';
import { decodeJWT } from './utils/decodeJwt';
import React from 'react';
config.autoAddCss = false; // Tắt CSS tự động để tránh xung đột

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          style={{ zIndex: 9999 }}
        />
        <Header />
        {children}

        <Footer />
      </body>
    </html>
  );
}
