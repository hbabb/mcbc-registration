import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "admin") 
redirect("/unauthorized");

  return children;
}
