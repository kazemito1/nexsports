"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface CheckoutInput {
  items: CheckoutItem[];
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export async function createCheckoutSession(input: CheckoutInput) {
  const { userId } = await auth();

  const subtotal = input.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 300 ? 0 : 29.9;
  const total = subtotal + shipping;

  const user = userId
    ? await prisma.user.findUnique({ where: { clerkUserId: userId } })
    : null;

  const order = await prisma.order.create({
    data: {
      status: "PENDING",
      paymentStatus: "PENDING",
      subtotal,
      shippingCost: shipping,
      total,
      shippingAddress: JSON.stringify(input.shippingAddress),
      userId: user?.id,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: input.items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          metadata: {
            size: item.size ?? "",
            color: item.color ?? "",
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/carrinho`,
    metadata: {
      orderId: order.id,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { paymentIntentId: session.id },
  });

  redirect(session.url ?? "/carrinho");
}
