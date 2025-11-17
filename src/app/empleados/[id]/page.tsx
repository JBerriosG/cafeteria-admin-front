"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../lib/api";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    disponible: boolean;
}

interface DetallePedido {
    id: number;
    cantidad: number;
    precioUnitario: number;
    producto: Producto;
}

interface GrupoPedido {
    id: number;
    nombreCliente: string;
    detalles: DetallePedido[];
}

interface Mesa {
    id: number;
    numero: number;
    capacidad: number;
    ocupada: boolean;
}

interface Pedido {
    id: number;
    fechaHora: string;
    estado: string;
    mesa: Mesa;
    grupo: GrupoPedido[];
}

interface Empleado {
    id: number;
    nombre: string;
    rol: string;
    pedidos: Pedido[];
}

export default function EmpleadoDetallePage() {
    const { id } = useParams();
    const [empleado, setEmpleado] = useState<Empleado | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const res = await api.get(`/empleado/${id}`);
                setEmpleado(res.data);
            } catch (err) {
                console.error("Error al cargar empleado:", err);
                setError("No se pudo cargar la información del empleado.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmpleado();
    }, [id]);

    if (loading) {
        return <p className="p-8 text-gray-500">Cargando información...</p>;
    }

    if (error) {
        return <p className="p-8 text-red-500">{error}</p>;
    }

    if (!empleado) {
        return <p className="p-8 text-gray-500">Empleado no encontrado.</p>;
    }

    return (
        <div className="p-8">
            <Link href="/empleados" className="text-blue-600 hover:text-blue-800">
                ← Volver a empleados
            </Link>

            <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
                <h1 className="text-3xl font-bold text-gray-800">{empleado.nombre}</h1>
                <p className="text-gray-500 text-lg mb-4">{empleado.rol}</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
                    Pedidos Asignados
                </h2>

                {empleado.pedidos.length === 0 ? (
                    <p className="text-gray-500">Este empleado aún no ha tomado pedidos.</p>
                ) : (
                    <div className="space-y-8">
                        {empleado.pedidos.map((pedido) => (
                            <div
                                key={pedido.id}
                                className="border rounded-2xl p-6 shadow-sm bg-gray-50"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold text-gray-700">
                                        Pedido #{pedido.id}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${pedido.estado === "EN_PROCESO"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : pedido.estado === "LISTO"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {pedido.estado}
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-2">
                                    <strong>Mesa:</strong> #{pedido.mesa.numero} (Capacidad:{" "}
                                    {pedido.mesa.capacidad} Personas)
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <strong>Fecha:</strong>{" "}
                                    {new Date(pedido.fechaHora).toLocaleString()}
                                </p>

                                {pedido.grupo.map((grupo) => (
                                    <div key={grupo.id} className="mt-4 border-t pt-4">
                                        <h4 className="text-lg font-semibold text-gray-700">
                                            Cliente: {grupo.nombreCliente}
                                        </h4>

                                        <table className="min-w-full border border-gray-300 rounded-lg text-sm mt-2">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Producto</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Categoría</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Cantidad</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Precio Unitario</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {grupo.detalles.map((detalle) => (
                                                    <tr key={detalle.id} className="hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{detalle.producto.nombre}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{detalle.producto.categoria}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{detalle.cantidad}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">${detalle.precioUnitario}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                                            ${detalle.cantidad * detalle.precioUnitario}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
