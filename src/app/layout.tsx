"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="es">
      <body className="flex min-h-screen bg-gray-100 dark:text-white">
        <div className="flex h-screen w-full">

          {/* ===== SIDEBAR ===== */}
          <div
            className={`
              fixed top-0 left-0 h-full z-40 transition-transform duration-300
              w-44 bg-[#1E293B] text-white
              ${open ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0
            `}
          >
            <Sidebar setOpen={setOpen}/>
          </div>

          {/* ===== CONTENIDO PRINCIPAL ===== */}
          <div
            className={`
              flex flex-col flex-1 transition-all duration-300
              ${open ? "ml-44" : "ml-0"}
              md:ml-52
            `}
          >
            {/* NAVBAR */}
            <div className="h-16 bg-white shadow-sm fixed top-0 left-0 md:left-52 right-0 z-30">
              <Navbar setOpen={setOpen} open={open} />
            </div>

            {/* MAIN */}
            <main className="flex w-full overflow-y-auto mt-16 p-2">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
