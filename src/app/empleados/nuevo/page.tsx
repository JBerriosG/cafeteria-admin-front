"use client";

import EmpleadoForm from "@/app/components/EmpleadoForm";

export default function NuevoEmpleadoPage() {
    return (
      <div className="p-4 w-full">
        <EmpleadoForm mode="create"/>
      </div>
    );
}