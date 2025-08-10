
import { NextResponse } from "next/server";
import { requireRole } from "@/src/lib/auth/guards";
import { supabaseServer } from "@/src/lib/supabase/server";
import { logAudit } from "@/src/lib/audit";

export async function POST(req: Request, { params }:{ params: { id: string } }){

  const origin = req.headers.get('origin') || '';
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  if (!origin.startsWith(base)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });

  const supabase = supabaseServer();
  await requireRole(['OWNER','ADMIN','MOD']);
  const form = await req.formData();
  const status = String(form.get("status") || "OPEN").toUpperCase();
  await supabase.from("reports").update({ status }).eq("id", params.id);
  await logAudit({ action: "REPORT_STATUS", targetType: "report", targetId: params.id, diff: { status } });
  return NextResponse.redirect(new URL("/admin/reports", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
}
