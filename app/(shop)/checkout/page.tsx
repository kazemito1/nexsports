"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { createCheckoutSession } from "./_actions/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 29.9;
  const total = subtotal + shipping;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const shippingAddress = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
    };

    try {
      await createCheckoutSession({
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        shippingAddress,
      });
      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <h1 className="text-2xl font-medium lowercase">Seu carrinho está vazio</h1>
        <Button asChild className="mt-6 rounded-full bg-[#0F766E] text-white hover:bg-[#b3e600]">
          <Link href="/">Voltar à loja</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/carrinho">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao carrinho
        </Link>
      </Button>

      <h1 className="mb-8 text-3xl font-medium lowercase tracking-tight">Finalizar Compra</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-2">
          <section className="rounded-xl border border-border p-6">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h2 className="text-lg font-bold">Endereço de Entrega</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" name="address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" name="state" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input id="zipCode" name="zipCode" required />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border p-6">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="text-lg font-bold">Pagamento</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Você será redirecionado para o Stripe para finalizar o pagamento com segurança.
            </p>
          </section>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[#0F766E] py-6 text-base font-bold text-black hover:bg-[#b3e600] disabled:opacity-70"
          >
            {isLoading ? "Processando..." : `Pagar ${formatCurrency(total)}`}
          </Button>
        </form>

        <aside className="h-fit rounded-xl border border-border p-6">
          <h2 className="mb-4 text-lg font-bold">Resumo</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} x {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrega</span>
              <span>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
