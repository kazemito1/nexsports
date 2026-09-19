import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";

export default async function HomePage() {
  const [featuredProducts, femCategory, mascCategory] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, active: true },
      take: 3,
      include: { category: true },
    }),
    prisma.category.findUnique({ where: { slug: "roupas-femininas" } }),
    prisma.category.findUnique({ where: { slug: "roupas-masculinas" } }),
  ]);

  const features = [
    {
      category: femCategory,
      caption: "roupas femininas",
      description: "conforto para o dia a dia",
      image: "/design/category-feminino.png",
    },
    {
      category: mascCategory,
      caption: "roupas masculinas",
      description: "versatilidade para treinar",
      image: "/design/category-masculino.png",
    },
  ].filter((f) => f.category !== null);

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6">
      {/* Hero: lifestyle photo with lowercase headline overlay */}
      <section className="relative mt-6 overflow-hidden rounded-[24px] min-h-[560px] lg:min-h-[72vh]">
        <Image
          src="/design/hero-runner.png"
          alt="Corredor em movimento"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-xl p-8 md:p-12">
          <h1 className="text-4xl font-medium lowercase leading-tight tracking-tight text-foreground md:text-6xl">
            encontre seu ritmo
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
            Conforto e estilo para o seu dia a dia. Peças pensadas para você treinar e viver melhor.
          </p>
          <Button
            asChild
            className="mt-6 h-12 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground lowercase hover:bg-primary/90"
          >
            <Link href="/categoria/calcados">
              comprar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Two asymmetric feature blocks */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.category!.id}
            href={`/categoria/${feature.category!.slug}`}
            className="group relative overflow-hidden rounded-[24px] bg-secondary"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={feature.image}
                alt={feature.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 className="text-2xl font-medium lowercase text-foreground md:text-3xl">
                  {feature.caption}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary lowercase">
                  explorar <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Tidy 3-product row */}
      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-medium lowercase text-foreground md:text-3xl">novidades</h2>
          <Link href="/categoria/roupas-masculinas" className="inline-flex items-center text-sm font-medium text-primary lowercase hover:underline">
            ver tudo <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Minimal benefits strip */}
      <section className="mt-16 mb-16 rounded-[24px] bg-card py-10">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-sm font-medium lowercase text-foreground">frete grátis</p>
            <p className="mt-1 text-xs text-muted-foreground">em compras acima de R$ 300</p>
          </div>
          <div>
            <p className="text-sm font-medium lowercase text-foreground">troca fácil</p>
            <p className="mt-1 text-xs text-muted-foreground">até 7 dias após o recebimento</p>
          </div>
          <div>
            <p className="text-sm font-medium lowercase text-foreground">pagamento seguro</p>
            <p className="mt-1 text-xs text-muted-foreground">dados protegidos do início ao fim</p>
          </div>
        </div>
      </section>
    </main>
  );
}
