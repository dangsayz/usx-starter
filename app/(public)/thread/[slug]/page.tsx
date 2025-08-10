
import { supabaseServer } from "@/src/lib/supabase/server";
import { notFound } from "next/navigation";
import { env } from "@/src/lib/env";
import { articleSchema } from "@/src/lib/schema";

export const dynamic = 'force-dynamic';

export default async function ThreadDetail({ params }:{ params: { slug: string } }){
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("threads").select("*").eq("slug", params.slug).single();
  if(error || !data) notFound();
  const url = `${env.SITE_URL}/thread/${params.slug}`;
  const jsonLd = articleSchema({ title: data.title, url, datePublished: data.created_at });
  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="mt-4 whitespace-pre-wrap">{data.content}</p>
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  );
}
