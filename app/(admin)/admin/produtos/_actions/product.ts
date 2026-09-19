"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface ProductInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  basePrice?: number;
  stock: number;
  categoryId: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  active?: boolean;
}

export async function createProduct(input: ProductInput) {
  const product = await prisma.product.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      price: input.price,
      basePrice: input.basePrice,
      stock: input.stock,
      categoryId: input.categoryId,
      images: input.images ? JSON.stringify(input.images) : null,
      sizes: input.sizes ? JSON.stringify(input.sizes) : null,
      colors: input.colors ? JSON.stringify(input.colors) : null,
      featured: input.featured ?? false,
      active: input.active ?? true,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/");
  redirect("/admin/produtos");

  return product;
}

export async function updateProduct(id: string, input: ProductInput) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      price: input.price,
      basePrice: input.basePrice,
      stock: input.stock,
      categoryId: input.categoryId,
      images: input.images ? JSON.stringify(input.images) : null,
      sizes: input.sizes ? JSON.stringify(input.sizes) : null,
      colors: input.colors ? JSON.stringify(input.colors) : null,
      featured: input.featured ?? false,
      active: input.active ?? true,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/");

  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/produtos");
  revalidatePath("/");
}
