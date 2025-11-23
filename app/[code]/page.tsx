import { redirect, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type RedirectPageProps = {
  params: Promise<{ code: string }>;
};

export default async function RedirectPage(props: RedirectPageProps) {
  const { code } = await props.params;  

  const supabase_client = supabase;  

  const { data, error } = await supabase_client
    .from("links")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) return notFound();

  // Increment clicks
  await supabase
    .from("links")
    .update({
      clicks: data.clicks + 1,
      last_clicked: new Date(),
    })
    .eq("code", code);

  redirect(data.url);
}