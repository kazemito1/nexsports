import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-black">Novo Produto</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
