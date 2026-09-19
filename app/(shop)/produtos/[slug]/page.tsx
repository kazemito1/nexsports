import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetail } from "./product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const images = product.images ? (JSON.parse(product.images) as string[]) : [];
  const sizes = product.sizes ? (JSON.parse(product.sizes) as string[]) : [];
  const colors = product.colors ? (JSON.parse(product.colors) as string[]) : [];

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: Number(product.price),
        basePrice: product.basePrice ? Number(product.basePrice) : null,
        stock: product.stock,
        images,
        sizes,
        colors,
        category: {
          name: product.category.name,
          slug: product.category.slug,
        },
      }}
    />
  );
}
