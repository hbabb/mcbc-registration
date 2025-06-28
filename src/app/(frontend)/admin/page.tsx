import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { ChildRow } from "@/app/(frontend)/admin/columns";

import { columns } from "@/app/(frontend)/admin/columns";
import { DataTable } from "@/app/(frontend)/admin/dataTable";
import McbcLogo from "@/assets/mcbc-logo/McbcTransparentLogo.svg";
import { SignOut } from "@/components/auth/signout-button";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/db/index";
import { children, guardians } from "@/db/schema";
import { auth } from "@/server/auth";

async function getRowsByProgram(program: "VBS" | "SYO"): Promise<ChildRow[]> {
  const rows = await db
    .select({
      id: children.id,
      firstName: children.firstName,
      lastName: children.lastName,
      guardian: sql<string>`(${guardians.firstName} || ' ' || ${guardians.lastName})`,
      dateOfBirth: children.dateOfBirth,
      classInFall: children.classInFall,
      school: children.school,
      // createdAt: children.createdAt,
    })
    .from(children)
    .leftJoin(guardians, eq(children.guardianId, guardians.id))
    .where(eq(children.program, program));

  return rows;
}

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "admin") 
redirect("/unauthorized");

  const [vbs, syo] = await Promise.all([
    getRowsByProgram("VBS"),
    getRowsByProgram("SYO"),
  ]);

  return (
    <div
      className="flex min-h-dvh w-full flex-col items-center-safe pt-1"
      style={{ backgroundImage: "url(/adminBackground.jpg)" }}
    >
      <header className="w-full max-w-7xl rounded-2xl border border-white/80 bg-white/30 shadow-2xl backdrop-blur-2xl dark:bg-white/60 dark:shadow-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-2">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src={McbcLogo}
              alt="Motlow Creek Baptist Church Logo"
              width={40}
              height={40}
              className="size-50 justify-self-start"
            />
          </Link>

          <div className="flex flex-row justify-around gap-3">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <SignOut />
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex w-full max-w-7xl flex-col items-center-safe justify-center-safe space-y-16 p-8">
        <Card className="m-4 w-full max-w-2/3 rounded-2xl border border-white/80 bg-white/30 p-4 shadow-2xl backdrop-blur-2xl">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            VBS Registrations
          </h2>
          <DataTable columns={columns} data={vbs} />
        </Card>
        <Card className="m-4 w-full max-w-2/3 rounded-2xl border border-white/80 bg-white/30 p-4 shadow-2xl backdrop-blur-2xl">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            SYO Registrations
          </h2>
          <DataTable columns={columns} data={syo} />
        </Card>
      </div>
    </div>
  );
}
