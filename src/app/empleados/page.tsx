"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../../lib/api"; // asegúrate de que esta ruta sea correcta

interface Empleado {
  id: number;
  nombre: string;
  rol: string;
  pedidos?: Pedido[];
}

interface Pedido {
  id: number;
  fechaHora: string;
  estado: string;
}

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await api.get("/empleado");
        console.log("📦 Empleados recibidos:", res.data);
        setEmpleados(res.data);
      } catch (err) {
        console.error("Error cargando empleados:", err);
        setError("No se pudieron cargar los empleados.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  if (loading) {
    return <p className="p-8 text-gray-500">Cargando empleados...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row mb-4 justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Empleados
        </h1>
        <Link
          href="/empleados/nuevo"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-2 rounded-lg shadow-sm transition duration-200">
          + Crear Empleado
        </Link>
      </div>

      {empleados.length === 0 ? (
        <p className="text-gray-500">No hay empleados registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {empleados.map((empleado) => (
            <div
              key={empleado.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {empleado.nombre}
              </h2>
              <p className="text-gray-500">{empleado.rol}</p>

              <div className="mt-4 text-lg text-gray-600 space-y-1">
                <p><strong>Pedidos Asignados: </strong> {empleado.pedidos?.length ?? "0"}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-6 justify-between">
                <Link
                  href={`/empleados/${empleado.id}`}
                >
                  <button className="bg-gray-600 hover:bg-gray-800 text-white px-3 py-1 rounded-lg">
                    Ver detalles
                  </button>
                  
                </Link>
                <Link href={`/empleados/editar/${empleado.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">
                    Editar
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
