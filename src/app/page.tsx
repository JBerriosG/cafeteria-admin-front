'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function DashboardHome(){
  const [stats, setStats] = useState({
    empleados:0,
    mesas:0,
    productos:0,
    pedidos:0
  });

  useEffect(()=>{
    Promise.all([
      api.get("/empleado").then((res)=> res.data.length),
      api.get("/mesa").then((res)=> res.data.length),
      api.get("/producto").then((res)=> res.data.length),
      api.get("/pedido").then((res)=> res.data.length),
    ]).then(([empleados, mesas, productos, pedidos])=>setStats({empleados, mesas, productos, pedidos}));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-gray-600">
        Bienvenido al sistema de gestión de la cafetería. Aquí puedes administrar el personal, las mesas, los productos y los pedidos.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <DashboardCard
          title="Empleados"
          value={stats.empleados}
          href="/empleados"
        />
        <DashboardCard title="Mesas" value={stats.mesas} href="/mesas" />
        <DashboardCard
          title="Productos"
          value={stats.productos}
          href="/productos"
        />
        <DashboardCard title="Pedidos" value={stats.pedidos} href="/pedidos" />
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: number;
  href: string;
};

function DashboardCard({ title, value, href }: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition-all p-5 border border-gray-100 cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">Ver detalles →</p>
      </div>
    </Link>
  );
}