import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
