import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa6";

import McbcLogo from "@/assets/mcbc-logo/McbcTransparentLogoSymbol.png";

export function Footer() {
  return (
    <footer className="flex h-28 w-full max-w-4xl flex-col items-center justify-between rounded-2xl bg-white/50 p-4 text-white md:h-16 md:flex-row">
      <div className="mr-[-1rem] hidden md:block">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src={McbcLogo}
            alt="Motlow Creek Baptist Church Logo"
            width={500}
            height={500}
            className="size-20 justify-self-start"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-slate-700">
          &copy; {new Date().getFullYear()} Motlow Creek Baptist Church. All
          rights reserved.
        </p>
        <p className="ml-4 flex flex-col items-center justify-center text-sm text-slate-600">
          Website development performed by{" "}
          <a
            href="https://github.com/hbabb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex flex-row gap-1 text-blue-700 hover:underline">
              Heath Babb <FaGithub className="size-4" />
            </span>
          </a>
        </p>
      </div>
      <div>
        <Link
          href="https://www.facebook.com/profile.php?id=100064495938328"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <FaFacebook className="size-6 text-[#3b5998] hover:text-blue-600" />
        </Link>
      </div>
    </footer>
  );
}
