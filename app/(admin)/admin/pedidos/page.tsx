import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, items: { include: { product: true } } },
  });

  function getStatusBadge(status: string) {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-700",
      PAID: "bg-green-100 text-green-700",
      PROCESSING: "bg-blue-100 text-blue-700",
      SHIPPED: "bg-purple-100 text-purple-700",
      DELIVERED: "bg-gray-100 text-gray-700",
      CANCELLED: "bg-red-100 text-red-700",
    };

    const labels: Record<string, string> = {
      PENDING: "Pendente",
      PAID: "Pago",
      PROCESSING: "Processando",
      SHIPPED: "Enviado",
      DELIVERED: "Entregue",
      CANCELLED: "Cancelado",
    };

    return (
      <Badge variant="secondary" className={styles[status] ?? "bg-gray-100"}>
        {labels[status] ?? status}
      </Badge>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-medium">Pedidos</h1>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{order.user?.name ?? order.user?.email ?? "Convidado"}</TableCell>
                <TableCell>{order.items.length} item(s)</TableCell>
                <TableCell>{formatCurrency(Number(order.total))}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
