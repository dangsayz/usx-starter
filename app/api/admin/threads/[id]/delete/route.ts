
import { NextResponse } from "next/server";
import { requireRole } from "@/src/lib/auth/guards";
import { supabaseServer } from "@/src/lib/supabase/server";
import { logAudit } from "@/src/lib/audit";

export async function POST(req: Request, { params }:{ params: { id: string } }){

  const origin = req.headers.get('origin') || '';
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  if (!origin.startsWith(base)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });

  const supabase = supabaseServer();
  await requireRole(['OWNER','ADMIN']);
  await supabase.from("threads").delete().eq("id", params.id);
  await logAudit({ action: "THREAD_DELETE", targetType: "thread", targetId: params.id });
  return NextResponse.redirect(new URL("/admin/threads", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
}
