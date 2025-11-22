"use client";

import EmpleadoForm from "@/app/components/EmpleadoForm";
import { useParams } from "next/navigation";


export default function EditarEmpleadoPage() {
  const params = useParams();
  const id = params?.id;
  console.log("id: ", id);

  return (
    <div className="p-8 w-full">
      <EmpleadoForm mode="edit" empleadoId={Number(id)} />
    </div>
  );
}