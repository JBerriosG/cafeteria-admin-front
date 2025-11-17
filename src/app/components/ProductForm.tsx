"use client";

import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: number;
}

export default function ProductForm({ mode, productId }: ProductFormProps) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    disponible: true,
  });
  const router = useRouter();

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (mode === "edit" && productId) {
      api.get(`/producto/${productId}`).then((res) => {
        setForm({
          nombre: res.data.nombre,
          precio: res.data.precio,
          categoria: res.data.categoria,
          disponible: res.data.disponible,
        });
      });
    }
  }, [mode, productId]);

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
      await api.post("/producto", form);
      setSuccess("Producto creado con éxito 🎉");
      setTimeout(() => {
        router.push("/productos");
      }, 1000);
    } else {
      await api.put(`/producto/${productId}`, form);
      setSuccess("Producto editado con éxito 🎉");
       setTimeout(() => {
        router.push("/productos");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-4"
    >
      <h1 className="text-2xl font-semibold">
        {mode === "create" ? "Crear Producto" : "Editar Producto"}
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
        <label className="font-medium">Precio</label>
        <input
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1"
          required
        />
      </div>

      <div>
        <label className="font-medium">Categoría</label>
        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />
        <label>Disponible</label>
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
