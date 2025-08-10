
import Link from "next/link";
export default function Page(){
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">USX Starter v2.1</h1>
      <p className="opacity-80">Auth + Threads + Admin + SEO + Security.</p>
      <div className="flex gap-3 flex-wrap">
        <Link href="/signup" className="underline">Join</Link>
        <Link href="/forum" className="underline">Forum</Link>
        <Link href="/profile" className="underline">Profile</Link>
        <Link href="/admin" className="underline">Admin</Link>
        <Link href="/sitemap.xml" className="underline">Sitemap</Link>
      </div>
    </main>
  );
}
