
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabase/server";

export async function GET(_: Request, { params }:{ params: { id: string } }){
  const supabase = supabaseServer();
  const { data } = await supabase.from('threads').select('slug').eq('id', params.id).maybeSingle();
  if(!data?.slug) return NextResponse.redirect(new URL('/forum', 'http://localhost:3000'), 302);
  return NextResponse.redirect(new URL(`/thread/${data.slug}`, 'http://localhost:3000'), 301);
}
