"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 29.9;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
        <ShoppingBag className="h-16 w-16 text-neutral-300" />
        <h1 className="mt-6 text-2xl font-black">Seu carrinho está vazio</h1>
        <p className="mt-2 text-neutral-600">Adicione produtos e volte aqui para finalizar sua compra.</p>
        <Button asChild className="mt-6 rounded-full bg-[#CCFF00] px-6 text-black hover:bg-[#b3e600]">
          <Link href="/">Continuar Comprando</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="mb-8 text-3xl font-black tracking-tight">Carrinho</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 rounded-xl border border-neutral-200 p-4"
            >
              <div className="relative aspect-square w-24 overflow-hidden rounded-lg bg-neutral-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-neutral-500">
                    {item.size && `Tamanho: ${item.size}`}
                    {item.size && item.color && " / "}
                    {item.color && `Cor: ${item.color}`}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        removeItem(item.productId, item.size, item.color)
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-neutral-200 p-6">
          <h2 className="mb-4 text-lg font-bold">Resumo do Pedido</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Entrega</span>
              <span>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</span>
            </div>
            <hr className="border-neutral-200" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            asChild
            className="mt-6 w-full rounded-full bg-[#CCFF00] py-6 text-base font-bold text-black hover:bg-[#b3e600]"
          >
            <Link href="/checkout">
              Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <p className="mt-3 text-center text-xs text-neutral-500">
            Frete grátis em compras acima de {formatCurrency(300)}
          </p>
        </div>
      </div>
    </div>
  );
}
