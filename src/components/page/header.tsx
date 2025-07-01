import Image from "next/image";
import Link from "next/link";

import McbcLogo from "@/assets/mcbc-logo/McbcTransparentLogo.svg";
import { SignOut } from "@/components/auth/signout-button";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/50 shadow-2xl backdrop-blur-2xl dark:bg-white/60 dark:shadow-white">
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
          {session ? (
            <div className="flex flex-row items-center justify-around gap-3">
              <Link href="/admin">
                <Button variant="outline">Admin</Button>
              </Link>
              <SignOut />
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
