
import Link from "next/link";
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Forum(){
  const supabase = supabaseServer();
  const { data: threads } = await supabase.from("threads").select("slug,title,created_at").order("created_at",{ascending:false}).limit(50);
  return (
    <main className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Forum</h1>
        <Link className="underline" href="/forum/create">Create Thread</Link>
      </div>
      <ul className="space-y-2">
        {(threads ?? []).map(t => (
          <li key={t.slug}>
            <Link href={`/thread/${t.slug}`} className="underline">{t.title}</Link>
            <span className="text-xs opacity-70 ml-2">{new Date(t.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
