import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXSPORTS — Artigos Esportivos",
  description: "Loja de artigos esportivos com as melhores marcas. Calçados, roupas e acessórios para você ir além.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider localization={ptBR}>
      <html
        lang="pt-BR"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-white text-neutral-950">
          {children}
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
