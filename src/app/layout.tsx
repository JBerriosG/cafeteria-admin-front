"use client";

import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Brujillizas Coffee",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="es">
      <body className="flex min-h-screen bg-gray-100">
        <div className="flex h-screen w-full">

          {/* ===== SIDEBAR ===== */}
          <div
            className={`
              fixed top-0 left-0 h-full z-40 transition-transform duration-300
              w-64 bg-[#1E293B] text-white
              ${open ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0  /* visible en pantallas medias en adelante */
            `}
          >
            <Sidebar />
          </div>

          {/* ===== CONTENIDO PRINCIPAL ===== */}
          <div
            className={`
              flex flex-col flex-1 transition-all duration-300
              ${open ? "ml-64" : "ml-0"}
              md:ml-64 /* deja espacio solo en pantallas grandes */
            `}
          >
            {/* NAVBAR */}
            <div className="h-16 bg-white shadow-sm fixed top-0 left-0 md:left-64 right-0 z-30">
              <Navbar setOpen={setOpen} />
            </div>

            {/* MAIN */}
            <main className="flex w-full overflow-y-auto mt-16 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
