import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { prisma } from "@/lib/prisma";
import { CartIcon } from "./CartIcon";
import { AuthButton } from "./AuthButton";

export async function Header() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Row 1: brand + actions */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger className="rounded-full p-2 text-foreground hover:bg-secondary">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <nav className="flex flex-col gap-4 pt-6">
                  <Link href="/" className="text-lg font-semibold tracking-tight">
                    NEXSPORTS
                  </Link>
                  <hr className="border-border" />
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              NEX<span className="text-primary">SPORTS</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <form className="relative hidden md:block" action="/busca">
              <Input
                name="q"
                type="search"
                placeholder="Buscar..."
                className="h-9 w-48 rounded-full border-border bg-card pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:ring-primary lg:w-64"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </form>

            <Button variant="ghost" size="icon" className="rounded-full md:hidden hover:bg-secondary" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>

            <AuthButton />
            <CartIcon />
          </div>
        </div>

        {/* Row 2: centered categories in small caps */}
        <nav className="hidden items-center justify-center gap-8 pb-3 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
