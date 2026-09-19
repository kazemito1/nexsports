import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center md:px-6">
      <div className="rounded-full bg-[#CCFF00] p-4">
        <CheckCircle className="h-10 w-10 text-black" />
      </div>
      <h1 className="mt-6 text-3xl font-black">Pedido Confirmado!</h1>
      <p className="mt-3 text-neutral-600">
        Obrigado por comprar na NEXSPORTS. Você receberá um e-mail com os detalhes do seu pedido em breve.
      </p>
      <Button asChild className="mt-8 rounded-full bg-[#CCFF00] px-8 text-black hover:bg-[#b3e600]">
        <Link href="/">Voltar à Loja</Link>
      </Button>
    </div>
  );
}
