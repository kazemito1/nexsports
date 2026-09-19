import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true, active: true },
    take: 4,
    include: { category: true },
  });

  return (
    <main>
      {/* Cinematic hero: luminous uppercase headline left, product photo right */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/design/hero-dark.png"
            alt="Tênis de corrida em movimento"
            fill
            className="object-cover opacity-70"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-28 md:px-6 md:py-40">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Nova coleção
          </p>
          <h1 className="mt-6 max-w-2xl text-5xl font-medium uppercase leading-[1.05] tracking-[-2%] text-foreground md:text-7xl">
            <span className="block">Supere</span>
            <span className="block">seus</span>
            <span className="block text-primary">limites</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
            Equipamento de alta performance para quem não conhece limites. Calçados, roupas e acessórios esportivos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-lg bg-primary px-8 text-base font-medium uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/categoria/calcados">
                Comprar agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-lg border-border bg-transparent px-8 text-base font-medium uppercase tracking-wide text-foreground hover:bg-secondary"
            >
              <Link href="/categoria/roupas-masculinas">Ver roupas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Elevated product row on dark cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-medium uppercase tracking-[-2%] text-foreground md:text-3xl">
            Destaques
          </h2>
          <Link href="/categoria/roupas-masculinas" className="inline-flex items-center text-sm font-medium text-primary uppercase tracking-wide hover:underline">
            Ver tudo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Slim benefits strip with thin dividers */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border md:px-6">
          <div className="px-4">
            <p className="text-sm font-medium uppercase tracking-wide text-foreground">Frete grátis</p>
            <p className="mt-1 text-xs text-muted-foreground">em compras acima de R$ 300</p>
          </div>
          <div className="px-4">
            <p className="text-sm font-medium uppercase tracking-wide text-foreground">Troca fácil</p>
            <p className="mt-1 text-xs text-muted-foreground">até 7 dias após o recebimento</p>
          </div>
          <div className="px-4">
            <p className="text-sm font-medium uppercase tracking-wide text-foreground">Pagamento seguro</p>
            <p className="mt-1 text-xs text-muted-foreground">dados protegidos do início ao fim</p>
          </div>
        </div>
      </section>
    </main>
  );
}
