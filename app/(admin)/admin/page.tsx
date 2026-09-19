import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default async function AdminDashboardPage() {
  const [totalProducts, totalOrders, totalUsers, revenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true, items: { include: { product: true } } },
  });

  const cards = [
    { title: "Produtos", value: totalProducts, icon: Package },
    { title: "Pedidos", value: totalOrders, icon: ShoppingCart },
    { title: "Clientes", value: totalUsers, icon: Users },
    { title: "Receita", value: formatCurrency(Number(revenue._sum.total ?? 0)), icon: DollarSign },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-medium">Dashboard</h1>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-bold">Pedidos Recentes</h2>
      <div className="rounded-xl border border-border bg-card">
        {recentOrders.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Nenhum pedido encontrado.</p>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">Pedido #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.user?.name ?? "Cliente não identificado"} • {" "}
                    {order.items.length} item(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(Number(order.total))}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus === "PAID" ? "Pago" : "Pendente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
