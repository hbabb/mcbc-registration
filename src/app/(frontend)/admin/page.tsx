import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "admin") 
redirect("/unauthorized");

  return (
    <div className="align-center flex w-full flex-col justify-center">
      <h1>Admin Page</h1>
    </div>
  );
}
