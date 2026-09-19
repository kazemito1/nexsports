"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AddToCartButton } from "@/components/shop/AddToCartButton";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    basePrice: number | null;
    stock: number;
    images: string[];
    sizes: string[];
    colors: string[];
    category: { name: string; slug: string };
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] ?? "https://placehold.co/800x800/16181D/FF5A36?text=NEXSPORTS"
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.basePrice && product.basePrice > product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                    selectedImage === image ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={image} alt={product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {product.category.name}
            </p>
            <h1 className="mt-2 text-3xl font-medium uppercase tracking-[-2%] text-foreground md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-foreground">{formatCurrency(product.price)}</span>
              {hasDiscount && product.basePrice && (
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.basePrice)}</span>
              )}
            </div>
          </div>

          {product.description && (
            <p className="text-muted-foreground">{product.description}</p>
          )}

          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <Label className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Tamanho</Label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="space-y-3">
              <Label className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Cor</Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    type="button"
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Quantidade</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
          />

          <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted-foreground">
            <p>✓ Envio para todo o Brasil</p>
            <p>✓ Trocas e devoluções em até 7 dias</p>
            <p>✓ Pagamento seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
