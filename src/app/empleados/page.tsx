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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Empleados
      </h1>

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
              <div className="mt-6 text-right">
                <Link
                  href={`/empleados/${empleado.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver detalles →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
