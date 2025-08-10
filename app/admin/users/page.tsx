
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Users(){
  const supabase = supabaseServer();
  const { data } = await supabase.from("user_roles").select("user_id, role");
  const users = data ?? [];
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-50"><th className="p-2 text-left">User ID</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.user_id} className="border-t">
              <td className="p-2">{u.user_id}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <form action={`/api/admin/users/${u.user_id}/set-role`} method="post" className="flex gap-2 items-center">
                  <select name="role" className="border rounded px-2 py-1">
                    <option>OWNER</option><option>ADMIN</option><option>MOD</option><option>EDITOR</option><option>VENDOR</option><option>USER</option>
                  </select>
                  <button className="border rounded px-2 py-1" type="submit">Set Role</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
