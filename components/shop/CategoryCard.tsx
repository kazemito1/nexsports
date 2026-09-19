import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl =
    category.image ?? "https://placehold.co/600x400/0A0A0A/CCFF00?text=NEXSPORTS";

  return (
    <Link href={`/categoria/${category.slug}`} className="group relative overflow-hidden rounded-xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">{category.name}</h3>
          <span className="text-sm text-neutral-200 opacity-0 transition-opacity group-hover:opacity-100">Ver produtos →</span>
        </div>
      </div>
    </Link>
  );
}
