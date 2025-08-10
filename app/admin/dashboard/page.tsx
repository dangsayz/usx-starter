
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Dashboard(){
  const supabase = supabaseServer();
  const [{ count: users }, { count: threads }, { count: openReports }] = await Promise.all([
    supabase.from("user_roles").select("*", { count: "exact", head: true }),
    supabase.from("threads").select("*", { count: "exact", head: true }),
    supabase.from("reports").select("*", { count: "exact", head: true }).eq("status","OPEN"),
  ]);
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4"><div className="text-sm opacity-70">Users</div><div className="text-2xl font-bold">{users ?? 0}</div></div>
        <div className="border rounded p-4"><div className="text-sm opacity-70">Threads</div><div className="text-2xl font-bold">{threads ?? 0}</div></div>
        <div className="border rounded p-4"><div className="text-sm opacity-70">Open Reports</div><div className="text-2xl font-bold">{openReports ?? 0}</div></div>
      </div>
    </main>
  );
}
