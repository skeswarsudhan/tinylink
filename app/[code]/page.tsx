import { supabase } from "@/lib/supabase";
import { redirect, notFound } from "next/navigation";

type RedirectPageProps = {
  params: {
    code: string;
  };
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !data) return notFound();

  // Increment clicks
  await supabase
    .from("links")
    .update({
      clicks: data.clicks + 1,
      last_clicked: new Date()
    })
    .eq("code", params.code);

  redirect(data.url);
}
