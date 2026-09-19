"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/app/(admin)/admin/produtos/_actions/product";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number | Prisma.Decimal;
    basePrice: number | Prisma.Decimal | null;
    stock: number;
    categoryId: string;
    images: string | null;
    sizes: string | null;
    colors: string | null;
    featured: boolean;
    active: boolean;
  };
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const input = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: (formData.get("description") as string) || undefined,
      price: Number(formData.get("price")),
      basePrice: formData.get("basePrice")
        ? Number(formData.get("basePrice"))
        : undefined,
      stock: Number(formData.get("stock")),
      categoryId: formData.get("categoryId") as string,
      images: (formData.get("images") as string)
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
      sizes: (formData.get("sizes") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: (formData.get("colors") as string)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    };

    startTransition(async () => {
      if (product) {
        await updateProduct(product.id, input);
      } else {
        await createProduct(input);
      }
      router.push("/admin/produtos");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={product?.slug}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={product ? Number(product.price) : ""}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="basePrice">Preço Original (R$)</Label>
          <Input
            id="basePrice"
            name="basePrice"
            type="number"
            step="0.01"
            defaultValue={product && product.basePrice ? Number(product.basePrice) : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Estoque</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={product ? Number(product.stock) : ""}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Categoria</Label>
        <Select name="categoryId" defaultValue={product?.categoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Imagens (uma URL por linha)</Label>
        <Textarea
          id="images"
          name="images"
          defaultValue={
            product?.images
              ? (JSON.parse(product.images) as string[]).join("\n")
              : ""
          }
          rows={4}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sizes">Tamanhos (separados por vírgula)</Label>
          <Input
            id="sizes"
            name="sizes"
            defaultValue={
              product?.sizes
                ? (JSON.parse(product.sizes) as string[]).join(", ")
                : ""
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="colors">Cores (separadas por vírgula)</Label>
          <Input
            id="colors"
            name="colors"
            defaultValue={
              product?.colors
                ? (JSON.parse(product.colors) as string[]).join(", ")
                : ""
            }
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="featured"
            name="featured"
            defaultChecked={product?.featured ?? false}
          />
          <Label htmlFor="featured">Destaque</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="active"
            name="active"
            defaultChecked={product?.active ?? true}
          />
          <Label htmlFor="active">Ativo</Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[#0F766E] px-8 text-black hover:bg-[#b3e600] disabled:opacity-70"
      >
        {isPending ? "Salvando..." : product ? "Atualizar Produto" : "Criar Produto"}
      </Button>
    </form>
  );
}
