
import { env } from "@/src/lib/env";
import { supabaseServer } from "@/src/lib/supabase/server";
export default async function sitemap(){
  const base = env.SITE_URL;
  const supabase = supabaseServer();
  const { data } = await supabase.from('threads').select('slug, updated_at:created_at').order('created_at',{ascending:false}).limit(100);
  const threads = (data ?? []).filter(Boolean).map((t:any)=>({
    url: `${base}/thread/${t.slug}`,
    lastModified: t.updated_at ?? new Date().toISOString()
  }));
  return [
    { url: `${base}/`, lastModified: new Date().toISOString() },
    { url: `${base}/forum`, lastModified: new Date().toISOString() },
    ...threads
  ];
}
