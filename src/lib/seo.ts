
import type { Metadata } from "next";
import { env } from "@/src/lib/env";

export function buildTitle(sub?: string){
  return sub ? `${sub} | ${env.SITE_NAME}` : env.SITE_NAME;
}
export function canonical(path: string){
  const p = path.startsWith("/") ? path : `/${path}`;
  return new URL(p, env.SITE_URL);
}

export const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: env.SITE_NAME,
};

export const defaultTwitter: Metadata["twitter"] = {
  card: "summary_large_image",
  creator: env.TWITTER || undefined,
};
