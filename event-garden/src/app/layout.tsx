"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNavBar from "./component/BottomNavBar";
import "./globals.css";
import { FormContext } from './assets/contextApi';
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tokenStatus, setTokenStatus] = useState(false);

  return (
    <html lang="en" className="relative">
      <FormContext.Provider value={{tokenStatus, setTokenStatus}}>
        <body className={inter.className}>{children}<BottomNavBar /></body>
      </FormContext.Provider>
    </html>
  );
}
