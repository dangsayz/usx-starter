
"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toSlug } from "@/src/lib/slug";

export default function CreateForm({ userId }:{ userId: string }){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [err, setErr] = useState<string|null>(null);
  const router = useRouter();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const slug = toSlug(title);
    const supabase = supabaseBrowser();
    const { error } = await supabase.from("threads").insert({ title, content, author_id: userId, slug });
    if(error){ setErr(error.message); return; }
    router.push(`/thread/${slug}`);
  };
  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Create thread</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full border rounded p-2 min-h-[160px]" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="border rounded px-3 py-2" type="submit">Post</button>
      </form>
    </main>
  );
}
