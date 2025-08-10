
import { env } from "@/src/lib/env";
export default function robots(){
  const sitemap = `${env.SITE_URL}/sitemap.xml`;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin']
    },
    sitemap
  };
}
