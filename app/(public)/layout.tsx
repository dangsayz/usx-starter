
import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { env } from "@/lib/env";
import { defaultOpenGraph, defaultTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: { default: env.SITE_NAME, template: `%s | ${env.SITE_NAME}` },
  metadataBase: new URL(env.SITE_URL),
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
  alternates: { canonical: new URL(env.SITE_URL) }
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
        <script type="application/ld+json" suppressHydrationWarning
          dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Organization","name": env.SITE_NAME, "url": env.SITE_URL })}} />
      </body>
    </html>
  );
}
