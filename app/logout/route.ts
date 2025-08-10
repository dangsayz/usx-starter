
import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabase/server";
export async function GET(){
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
}
