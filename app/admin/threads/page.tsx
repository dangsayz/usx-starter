
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Threads(){
  const supabase = supabaseServer();
  const { data } = await supabase.from("threads").select("id,slug,title,created_at").order("created_at",{ascending:false}).limit(100);
  const rows = data ?? [];
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Threads</h1>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-50"><th className="p-2 text-left">Title</th><th className="p-2">Created</th><th className="p-2">Actions</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.title}</td>
              <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
              <td className="p-2">
                <form action={`/api/admin/threads/${r.id}/delete`} method="post">
                  <button className="border rounded px-2 py-1" type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
