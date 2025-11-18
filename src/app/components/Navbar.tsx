"use client";

import { Bell, User, Menu } from "lucide-react";

interface NavbarProps {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Navbar({ setOpen }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Botón hamburguesa en móvil */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={() => setOpen(prev => !prev)}
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-semibold text-gray-800">Panel de Administración</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <User size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Camila</span>
        </div>
      </div>
    </header>
  );
}
