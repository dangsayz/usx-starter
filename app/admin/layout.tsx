
import Link from "next/link";
import { requireRole } from "@/src/lib/auth/guards";

export default async function AdminLayout({ children }:{ children: React.ReactNode }){
  await requireRole(['OWNER','ADMIN']);
  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border rounded p-4 space-y-2 sticky top-16 h-fit">
        <h2 className="font-semibold mb-2">Admin</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link className="underline" href="/admin/dashboard">Dashboard</Link>
          <Link className="underline" href="/admin/users">Users</Link>
          <Link className="underline" href="/admin/threads">Threads</Link>
          <Link className="underline" href="/admin/reports">Reports</Link>
          <Link className="underline" href="/admin/settings">Settings</Link>
          <Link className="underline" href="/admin/audit">Audit</Link>
        </nav>
      </aside>
      <section className="col-span-12 md:col-span-9 lg:col-span-10">{children}</section>
    </div>
  );
}
