
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Settings(){
  const supabase = supabaseServer();
  const { data: flags } = await supabase.from("feature_flags").select("*").order("key");
  const { data: settings } = await supabase.from("site_settings").select("*").order("key");
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <section className="space-y-2">
        <h2 className="font-semibold">Feature Flags</h2>
        <ul className="space-y-2">
          {(flags ?? []).map((f:any) => (
            <li key={f.key} className="flex items-center gap-2 border rounded p-2">
              <span className="font-mono text-sm">{f.key}</span>
              <form action="/api/admin/settings/set" method="post" className="ml-auto flex items-center gap-2">
                <input type="hidden" name="key" value={f.key} />
                <input type="hidden" name="type" value="flag" />
                <label className="text-sm">Enabled</label>
                <select name="enabled" defaultValue={String(f.enabled)} className="border rounded px-2 py-1">
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                <button className="border rounded px-2 py-1" type="submit">Save</button>
              </form>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">Site Settings</h2>
        <ul className="space-y-2">
          {(settings ?? []).map((s:any) => (
            <li key={s.key} className="flex items-center gap-2 border rounded p-2">
              <span className="font-mono text-sm">{s.key}</span>
              <form action="/api/admin/settings/set" method="post" className="ml-auto flex items-center gap-2">
                <input type="hidden" name="key" value={s.key} />
                <input type="hidden" name="type" value="setting" />
                <input name="value" defaultValue={JSON.stringify(s.value)} className="border rounded px-2 py-1 w-64" />
                <button className="border rounded px-2 py-1" type="submit">Save</button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
