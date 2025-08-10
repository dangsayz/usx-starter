
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Reports(){
  const supabase = supabaseServer();
  const { data } = await supabase.from("reports").select("*").order("created_at",{ascending:false}).limit(100);
  const rows = data ?? [];
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-50"><th className="p-2">Type</th><th className="p-2">Entity</th><th className="p-2">Reason</th><th className="p-2">Status</th><th className="p-2">Action</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.entity_type}</td>
              <td className="p-2">{r.entity_id}</td>
              <td className="p-2">{r.reason}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2">
                <form action={`/api/admin/reports/${r.id}/update`} method="post" className="flex gap-2">
                  <select name="status" className="border rounded px-2 py-1">
                    <option>OPEN</option><option>REVIEWING</option><option>RESOLVED</option>
                  </select>
                  <button className="border rounded px-2 py-1" type="submit">Update</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
