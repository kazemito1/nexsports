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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <nav className="flex flex-col gap-4 pt-6">
              <Link href="/" className="text-xl font-black tracking-tight">
                NEXSPORTS
              </Link>
              <hr className="border-neutral-200" />
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="text-sm font-medium text-neutral-700 hover:text-black"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-black">
            NEX
          </span>
          <span className="text-xl font-black tracking-tighter text-[#CCFF00]">
            SPORTS
          </span>
        </Link>

        {/* Desktop categories */}
        <nav className="hidden items-center gap-6 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Search + Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <form className="relative hidden md:block" action="/busca">
            <Input
              name="q"
              type="search"
              placeholder="Buscar produtos..."
              className="h-9 w-48 rounded-full bg-neutral-100 pl-9 pr-4 text-sm focus-visible:ring-[#CCFF00] lg:w-64"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          </form>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>

          <AuthButton />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
