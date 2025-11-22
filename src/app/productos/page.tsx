"use client";

import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api"; // asegúrate de que esta ruta sea correcta
import Link from "next/link";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    disponible: boolean;
}

export default function ProductosPage() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await api.get("/producto");
                console.log("📦 Productos recibidos:", res.data);
                setProductos(res.data);
            } catch (err) {
                console.error("Error cargando productos:", err);
                setError("No se pudieron cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    if (loading) {
        return <p className="p-8 text-gray-500">Cargando productos...</p>;
    }

    if (error) {
        return <p className="p-8 text-red-500">{error}</p>;
    }

    return (
        <div className="p-8 w-full">
            <div className="flex flex-col md:flex-row mb-4 justify-between">
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    Productos
                </h1>
                <Link
                    href="/productos/nuevo"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-2 rounded-lg shadow-sm transition duration-200">
                    + Crear Producto
                </Link>
            </div>

            {productos.length === 0 ? (
                <p className="text-gray-500">No hay productos registrados.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="flex flex-col gap-2 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">
                                {producto.nombre}
                            </h2>
                            <p className="text-gray-500">$ {producto.precio}.-</p>
                            <p className="text-gray-500 font-bold"> Categoría: {producto.categoria}</p>
                            <span className={`px-3 py-2 text-sm rounded-full font-bold ${producto.disponible ? "bg-green-200 text-green-400" : "bg-red-200 text-red-400"}`}>
                                {producto.disponible ? "DISPONIBLE" : "NO DISPONIBLE"}
                            </span>
                            <Link href={`/productos/${producto.id}`}>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">
                                    Editar
                                </button>
                            </Link>

                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}
