import Link from "next/link";
import { LayoutDashboard, Package, Tags, ShoppingCart, Users, Store } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/categorias", label: "Categorias", icon: Tags },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-medium tracking-tighter">NEX</span>
          <span className="text-lg font-medium tracking-tighter text-[#0F766E]">SPORTS</span>
        </Link>
        <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">ADMIN</span>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-black"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-black"
        >
          <Store className="h-4 w-4" />
          Ir para a loja
        </Link>
      </div>
    </aside>
  );
}
