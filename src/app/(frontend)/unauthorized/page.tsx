import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-dvh flex-col justify-center gap-8 p-1 align-middle md:flex-row md:p-6">
      <div className="flex w-1/2 flex-col justify-center-safe gap-4 align-middle">
        <h1 className="font-poppins text-7xl font-semibold">Ooops....</h1>
        <h2 className="font-poppins text-4xl font-light">Page not found</h2>
        <p className="font-poppins w-xl text-2xl font-light text-[#767676]">
          The page you are looking for is restricted. You do not have permission
          to access this location. Reach out to the site administrator if you
          believe this is in error.
        </p>
        <Button
          asChild
          className="font-poppins h-20 w-1/2 rounded-2xl bg-[#c6ff00] text-3xl font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-[#a8d600]"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
      <div>
        <Image
          src="/403_ERROR.png"
          width={500}
          height={500}
          alt="403 Error Message Image"
          priority
          className="w-full"
        />
      </div>
    </div>
  );
}
