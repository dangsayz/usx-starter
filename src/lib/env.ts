
export const env = {
  SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/,""),
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? "USX",
  TWITTER: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? ""
};
