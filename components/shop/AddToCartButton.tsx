"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
  };
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  quantity,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const imageUrl =
    product.images[0] ?? "https://placehold.co/600x600/0A0A0A/0F766E?text=NEXSPORTS";

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: imageUrl,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button
      onClick={handleAdd}
      className="w-full rounded-full bg-[#0F766E] py-6 text-base font-bold text-black hover:bg-[#b3e600]"
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Adicionado
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
        </>
      )}
    </Button>
  );
}
