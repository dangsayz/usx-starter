
import { redirect } from "next/navigation";
import { supabaseServer } from "@/src/lib/supabase/server";
import CreateForm from "./ui";

export default async function CreateThread(){
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) redirect("/login");
  return <CreateForm userId={user.id} />;
}
