import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryCard } from "@/components/shop/CategoryCard";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    take: 8,
    include: { category: true },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold text-black">
                NOVA COLEÇÃO
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                VÁ ALÉM DO SEU LIMITE
              </h1>
              <p className="max-w-md text-lg text-neutral-300">
                Equipamento de alta performance para quem não conhece limites. Calçados, roupas e acessórios esportivos com até 40% off.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-[#CCFF00] px-6 text-black hover:bg-[#b3e600]">
                  <Link href="/categoria/calcados">Comprar Agora <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white text-white hover:bg-white hover:text-black"
                >
                  <Link href="/categoria/roupas-masculinas">Ver Roupas</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 md:aspect-[4/3]">
              <Image
                src="https://placehold.co/800x800/0A0A0A/CCFF00?text=NEXSPORTS"
                alt="Coleção NEXSPORTS"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">Comprar por Categoria</h2>
          <Link href="/categoria/calcados" className="flex items-center text-sm font-medium hover:underline">
            Ver todas <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Destaques</h2>
            <Link href="/categoria/calcados" className="flex items-center text-sm font-medium hover:underline">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
