import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | Prisma.Decimal;
    basePrice: number | Prisma.Decimal | null;
    images: string | null;
    category: { name: string; slug: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images ? (JSON.parse(product.images) as string[]) : [];
  const imageUrl = images[0] ?? "https://placehold.co/600x600/EAE8E1/0F766E?text=NEXSPORTS";
  const price = Number(product.price);
  const basePrice = product.basePrice ? Number(product.basePrice) : null;
  const hasDiscount = basePrice && basePrice > price;

  return (
    <Link href={`/produtos/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-[24px] bg-secondary">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {product.category.name}
        </p>
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{formatCurrency(price)}</span>
          {hasDiscount && basePrice && (
            <span className="text-xs text-muted-foreground line-through">{formatCurrency(basePrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
