import Image from "next/image";
import Link from "next/link";

import vbs2025 from "@/assets/vbs-logo/logo_strd.jpg";
import syo2025 from "@/assets/vbs-logo/syo2025.svg";
import { Header } from "@/components/page/header";

export default async function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center-safe pt-1">
      <Header />
      <div className="mt-4 flex w-full max-w-7xl flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-bold">
          Click on the program you wish to register for
        </h3>
        <Link href="/vbs" className="flex flex-row items-center justify-center">
          <Image
            src={vbs2025}
            alt="Vacation Bible School Form Link"
            width={1365}
            height={1024}
            className="h-auto w-1/2"
          />
        </Link>
        <Link href="/syo" className="flex flex-row items-center justify-center">
          <Image
            src={syo2025}
            alt="Summer Youth Olympics Form Link"
            width={940}
            height={788}
            className="h-auto w-1/2"
          />
        </Link>
      </div>
    </div>
  );
}
