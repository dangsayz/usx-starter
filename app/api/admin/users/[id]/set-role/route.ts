
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
  const form = await req.formData();
  const role = String(form.get("role") || "USER").toUpperCase();
  await supabase.from("user_roles").upsert({ user_id: params.id, role });
  await logAudit({ action: "ROLE_CHANGE", targetType: "user", targetId: params.id, diff: { role } });
  return NextResponse.redirect(new URL("/admin/users", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
}
