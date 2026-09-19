import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <span className="text-lg font-semibold tracking-tight text-foreground">
                NEX<span className="text-primary">SPORTS</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Peças de esporte pensadas para o seu dia a dia. Conforto para treinar, versatilidade para viver.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-foreground">Categorias</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/categoria/calcados" className="hover:text-primary">Calçados</Link></li>
              <li><Link href="/categoria/tenis-masculino" className="hover:text-primary">Tênis Masculino</Link></li>
              <li><Link href="/categoria/tenis-feminino" className="hover:text-primary">Tênis Feminino</Link></li>
              <li><Link href="/categoria/roupas-masculinas" className="hover:text-primary">Roupas Masculinas</Link></li>
              <li><Link href="/categoria/roupas-femininas" className="hover:text-primary">Roupas Femininas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-foreground">Institucional</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/sobre" className="hover:text-primary">Sobre a NEXSPORTS</Link></li>
              <li><Link href="/contato" className="hover:text-primary">Contato</Link></li>
              <li><Link href="/trocas" className="hover:text-primary">Trocas e Devoluções</Link></li>
              <li><Link href="/privacidade" className="hover:text-primary">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {currentYear} NEXSPORTS. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
