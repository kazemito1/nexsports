import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-lg font-black tracking-tighter">NEX</span>
              <span className="text-lg font-black tracking-tighter text-[#CCFF00]">SPORTS</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-600">
              Sua loja de artigos esportivos com as melhores marcas e os melhores preços. Vá além do seu limite.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">Categorias</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/categoria/calcados" className="hover:text-black">Calçados</Link></li>
              <li><Link href="/categoria/tenis-masculino" className="hover:text-black">Tênis Masculino</Link></li>
              <li><Link href="/categoria/tenis-feminino" className="hover:text-black">Tênis Feminino</Link></li>
              <li><Link href="/categoria/roupas-masculinas" className="hover:text-black">Roupas Masculinas</Link></li>
              <li><Link href="/categoria/roupas-femininas" className="hover:text-black">Roupas Femininas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">Institucional</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/sobre" className="hover:text-black">Sobre a NEXSPORTS</Link></li>
              <li><Link href="/contato" className="hover:text-black">Contato</Link></li>
              <li><Link href="/trocas" className="hover:text-black">Trocas e Devoluções</Link></li>
              <li><Link href="/privacidade" className="hover:text-black">Política de Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold">Redes Sociais</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="#" className="inline-flex items-center hover:text-black">
                  <ExternalLink className="mr-2 h-4 w-4" /> Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-flex items-center hover:text-black">
                  <ExternalLink className="mr-2 h-4 w-4" /> Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-flex items-center hover:text-black">
                  <ExternalLink className="mr-2 h-4 w-4" /> Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-flex items-center hover:text-black">
                  <ExternalLink className="mr-2 h-4 w-4" /> YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500">
          © {currentYear} NEXSPORTS. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
