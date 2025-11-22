"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useRouter } from "next/navigation";

interface EmpleadoFormProps {
  mode: "create" | "edit";
  empleadoId?: number;
}

export default function EmpleadoForm({ mode, empleadoId }: EmpleadoFormProps) {
  const [form, setForm] = useState({
    nombre: "",
    rol: "",
  });
  const router = useRouter();

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (mode === "edit" && empleadoId) {
      api.get(`/empleado/${empleadoId}`).then((res) => {
        setForm({
          nombre: res.data.nombre,
          rol: res.data.rol
        });
      });
    }
  }, [mode, empleadoId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSuccess("");

    if (mode === "create") {
      await api.post("/empleado", form);
      setSuccess("empleado creado con éxito 🎉");
      setTimeout(() => {
        router.push("/empleados");
      }, 1000);
    } else {
      await api.put(`/empleado/${empleadoId}`, form);
      setSuccess("empleado editado con éxito 🎉");
      setTimeout(() => {
        router.push("/empleados");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-xl shadow-md max-w-xl space-y-4"
    >
      <h1 className="text-2xl font-semibold">
        {mode === "create" ? "Crear Empleado" : "Editar Empleado"}
      </h1>

      <div>
        <label className="font-medium">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="font-medium">Rol</label>
        <select
          name="rol"
          value={form.rol}              // <- esto asegura que se muestre el valor actual
          onChange={handleChange}       // <- mismo handler que usabas en el input
          className="w-full border rounded-lg p-2 mt-1"
          required
        >
          <option value="">Seleccione un rol</option>
          <option value="Socia">Socia</option>
          <option value="Mesero">Mesero</option>
          <option value="Cocina">Cocina</option>
        </select>

      </div>
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition duration-200"
      >
        {mode === "create" ? "Crear" : "Guardar Cambios"}
      </button>
    </form>
  );
}
