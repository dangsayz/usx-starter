
import { supabaseServer } from "@/src/lib/supabase/server";

export async function logAudit(input: { action: string; targetType: string; targetId: string; diff?: any; actorId?: string; }){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const actor_id = input.actorId ?? user?.id ?? null;
  await supabase.from("audit_logs").insert({
    actor_id, action: input.action, target_type: input.targetType, target_id: input.targetId, diff: input.diff ?? null
  });
}
