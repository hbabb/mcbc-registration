import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <h1>Magic Link Login</h1>
          <Button asChild variant="default">
            <Link href="/login">Login</Link>
          </Button>
        </main>
      </div>
    );
  }

  if (session) {
    return (
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <h1>Welcome {session.user?.email}</h1>
        </main>
      </div>
    );
  }
}
