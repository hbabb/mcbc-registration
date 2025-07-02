import type { Metadata } from "next";

import { TermsConditions } from "@/app/(frontend)/terms-conditions/termsConditions";

export const metadata: Metadata = {
  title: "Motlow Creek Baptist Church VBS Terms & Conditions",
  robots: { index: false, follow: false }, // Hide from search engines
};

export default function TermsConditionsPage() {
  return <TermsConditions />;
}
