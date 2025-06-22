import type { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import {
  Allura,
  Inter,
  Luckiest_Guy,
  Mona_Sans,
  Montserrat,
  Poppins,
  Roboto,
} from "next/font/google";
import Script from "next/script";
import React from "react";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-monaSans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest",
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  // Main title settings
  title: {
    default: "Motlow Creek Baptist Church | VBS 2025 Registration Form", // This shows in the browser tab and Google search
    template: "%s | Motlow Creek Baptist Church", // Other pages will use this template (i.e.: admin)
  },

  // Description that shows under your title in Google search results
  description:
    "Register for the 2025 Vacation Bible School extravaganza! Motlow Creek Baptist Church is hosting Lifeway&apos;s 2025 VBS in Campobello, SC. This years theme is Magnified! All children ages 4-11 are welcome to come join us in a safe christian environment.",

  // Keywords that help Google understand what your site is about
  keywords: [
    "VBS",
    "Vacation Bible School",
    "Motlow Creek Baptist Church",
    "The Creek",
    "children ministry",
    "summer program",
    "2025",
    "Magnified!",
    "Made to MAGNIFY God!",
    "Campobello, SC",
  ],

  // Author information
  authors: [{ name: "Motolow Creek Baptist Church" }],
  creator: "Byte Sized Solutions | Heath Babb",
  publisher: "Motlow Creek Baptist Church",

  // Tell Google how to index your site
  robots: {
    index: true, // Let Google show your site in search results
    follow: true, // Let Google follow links on your site
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // Allow full video previews in search
      "max-image-preview": "large", // Allow large image previews in search
      "max-snippet": -1, // Allow full-text snippets in search
    },
  },

  // Facebook and social media sharing settings
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vbs.motlowcreekministries.com",
    siteName: "Motlow Creek Baptist Church VBS Registration",
    title: "Motlow Creek Baptist Church | VBS 2025 Registration Form",
    description:
      "Register for the 2025 Vacation Bible School extravaganza! Motlow Creek Baptist Church is hosting Lifeway&apos;s 2025 VBS in Campobello, SC. This years theme is Magnified! All children ages 4-11 are welcome to come join us in a safe christian environment.",
    images: [
      {
        url: "/vbs-logo-strd.jpg", // Image that shows when shared on Facebook
        width: 1200,
        height: 630,
        alt: "Magnified! | VBS 2025 logo",
      },
    ],
  },

  // Twitter card settings
  twitter: {
    card: "summary_large_image", // Shows a big image when shared on Twitter
    title: "Motlow Creek Baptist Church | VBS 2025 Registration Form",
    description:
      "Register for the 2025 Vacation Bible School extravaganza! Motlow Creek Baptist Church is hosting Lifeway&apos;s 2025 VBS in Campobello, SC. This years theme is Magnified! All children ages 4-11 are welcome to come join us in a safe christian environment.",
    images: ["/vbs-logo-strd.jpg"],
  },

  // Verification codes for Google Search Console and Bing Webmaster Tools
  verification: {
    google: "TPyyMZ2SVL0PF68h-ngGAqN3saFZFOysCNNTPc3wt2E",
    other: {
      "msvalidate.01": "025EE86A773CCE498831650FD19D9DCB", // Bing Webmaster Tools
    },
  },

  // Main URL for your site (prevents duplicate content issues)
  alternates: {
    canonical: "https://vbs.motlowcreekministries.com",
  },

  // What category your site falls under
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${luckiestGuy.variable} ${allura.variable} ${roboto.variable} ${poppins.variable} ${monaSans.variable}`}
      suppressHydrationWarning
    >
      <body className={cn("flex min-h-dvh flex-col", inter.className)}>
        <main>{children}</main>
        <Toaster richColors />
        {/* @ts-expect-error - GoogleAnalytics is a valid component */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
          }}
        />
      </body>
    </html>
  );
}
