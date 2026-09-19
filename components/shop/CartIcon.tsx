"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export function CartIcon() {
  const count = useCart((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <Button variant="ghost" size="icon" className="relative" asChild aria-label="Carrinho">
      <Link href="/carrinho">
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00] text-[10px] font-bold text-black">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}
