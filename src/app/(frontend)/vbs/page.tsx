import Image from "next/image";

import styles from "@/app/(frontend)/vbs/page.module.css";
import McbcLogo from "@/assets/mcbc-logo/TransparentLogoIcon.svg";
import { Header } from "@/components/page/header";
import { RegistrationForm } from "@/components/page/registrationForm";

export default function VBSPage() {
  return (
    <div className={`${styles.container} relative w-full`}>
      {/* Background Image */}
      <div className={styles.background} />

      {/* Foreground Content */}
      <div className="flex w-full flex-col items-center justify-center p-4">
        <Header />
        {/* Page Header */}
        <div className="mt-4 space-y-1 rounded-2xl bg-white/80 p-6 text-center shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-0 md:m-0 md:flex-row md:gap-2">
            <Image
              src={McbcLogo}
              alt="Motlow Creek Baptist Church Logo"
              width={200}
              height={80}
              className="h-32 w-56"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-allura text-church-navy text-lg md:text-4xl">
                Motlow Creek Baptist Church
              </h1>
              <h2 className="mcbc-logo font-roboto text-church-navy text-xs uppercase">
                Where faith grows and hearts connect
              </h2>
              <address className="text-church-navy text-sm">
                2300 Motlow Creek Road
                <br />
                Campobello, SC 29322
                <br />
              </address>
            </div>
          </div>
          <h2 className="text-dartmouth-green font-luckiest text-lg uppercase md:text-xl lg:text-2xl">
            Vacation Bible School 2025 Registration
          </h2>
          <h3 className="text-marian-blue font-montserrat text-lg md:text-xl lg:text-2xl">
            Magnified!!!!
            <br />
            Made to MAGNIFY God!!!
          </h3>
        </div>
        <RegistrationForm eventCategory="SYO Registration" />
      </div>
    </div>
  );
}
