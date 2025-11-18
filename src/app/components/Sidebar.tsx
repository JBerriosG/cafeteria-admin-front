"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Coffee, ClipboardList, Table, Croissant, X } from "lucide-react";

const menuItems = [
    { name: "Inicio", icon: Home, href: "/" },
    { name: "Empleados", icon: Users, href: "/empleados" },
    { name: "Mesas", icon: Table, href: "/mesas" },
    { name: "Productos", icon: Croissant, href: "/productos" },
    { name: "Pedidos", icon: ClipboardList, href: "/pedidos" },
];

interface Props {
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({ setOpen }: Readonly<Props>) {
    const pathname = usePathname();

    return (
        <aside className="bg-white border-r border-gray-200 w-44 h-screen fixed left-0 top-0 flex flex-col">
            <div className=" flex p-6 border-b border-gray-100 gap-2">
                <Coffee size={20} color="gray" />
                <h2 className="text-xl font-bold text-blue-600">Brujillizas Coffee</h2>
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <X size={24} color="black"/>
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto mt-4">
                <ul className="space-y-1">
                    {menuItems.map(({ name, icon: Icon, href }) => {
                        const active = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`flex items-center gap-3 px-6 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all ${active ? "bg-blue-100 text-blue-700 font-semibold" : ""
                                        }`}
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
    );
}