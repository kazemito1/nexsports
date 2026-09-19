"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <UserButton />;
  }

  return (
    <Button variant="ghost" size="icon" asChild aria-label="Entrar">
      <Link href="/login">
        <User className="h-5 w-5" />
      </Link>
    </Button>
  );
}
