"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Users, Coffee, ClipboardList, Table, Croissant, Menu, X } from "lucide-react";

const menuItems = [
    { name: "Inicio", icon: Home, href: "/" },
    { name: "Empleados", icon: Users, href: "/empleados" },
    { name: "Mesas", icon: Table, href: "/mesas" },
    { name: "Productos", icon: Croissant, href: "/productos" },
    { name: "Pedidos", icon: ClipboardList, href: "/pedidos" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón hamburguesa solo en móviles */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white border rounded-lg p-2 shadow"
            >
                <Menu size={24} />
            </button>

            {/* Overlay para cerrar sidebar en mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    bg-white border-r border-gray-200 w-64 h-screen fixed left-0 top-0 flex flex-col 
                    transform transition-transform duration-300 z-50
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Header */}
                <div className="flex p-6 border-b border-gray-100 gap-2 justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Coffee size={20} color="gray" />
                        <h2 className="text-xl font-bold text-blue-600">Brujillizas Coffee</h2>
                    </div>

                    {/* Botón cerrar (solo mobile) */}
                    <button className="md:hidden" onClick={() => setOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menú */}
                <nav className="flex-1 overflow-y-auto mt-4">
                    <ul className="space-y-1">
                        {menuItems.map(({ name, icon: Icon, href }) => {
                            const active = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`flex items-center gap-3 px-6 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all ${
                                            active ? "bg-blue-100 text-blue-700 font-semibold" : ""
                                        }`}
                                        onClick={() => setOpen(false)} // cerrar en mobile
                                    >
                                        <Icon size={18} />
                                        <span>{name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}