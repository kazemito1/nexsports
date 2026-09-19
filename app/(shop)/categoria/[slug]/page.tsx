import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, active: true },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium lowercase tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-neutral-600">{category.description}</p>
        )}
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 py-16 text-center">
          <p className="text-neutral-600">Nenhum produto encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
