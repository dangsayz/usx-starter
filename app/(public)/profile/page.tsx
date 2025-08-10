
import { redirect } from "next/navigation";
import { supabaseServer } from "@/src/lib/supabase/server";

export default async function Profile(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");
  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <p>User ID: {user.id}</p>
      <p className="text-sm opacity-70 mt-2">Profile editing UI pending. DB created via supabase.sql.</p>
    </main>
  );
}
