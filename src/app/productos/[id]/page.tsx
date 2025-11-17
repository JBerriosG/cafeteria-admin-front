"use client";

import ProductForm from "@/app/components/ProductForm";
import { useParams } from "next/navigation";


export default function EditarProductoPage() {
  const params = useParams();
  const id = params?.id;
  console.log("id: ", id);

  return (
    <div className="p-8 w-full">
      <ProductForm mode="edit" productId={Number(id)} />
    </div>
  );
}
