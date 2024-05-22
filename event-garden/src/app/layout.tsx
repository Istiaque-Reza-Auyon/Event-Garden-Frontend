import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNavBar from "./component/BottomNavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Garden",
  description: "Solo project for Project Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={inter.className}>{children}<BottomNavBar /></body>
    </html>
  );
}
