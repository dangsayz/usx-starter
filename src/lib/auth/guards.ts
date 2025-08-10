
import { redirect } from "next/navigation";
import { supabaseServer } from "@/src/lib/supabase/server";

export async function requireUser(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");
  return user;
}

export async function requireRole(roles: Array<'OWNER'|'ADMIN'|'MOD'|'EDITOR'|'VENDOR'|'USER'>){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  const role = (data?.role ?? "USER") as any;
  const ok = roles.includes(role);
  if(!ok) redirect("/");
  return { user, role };
}
