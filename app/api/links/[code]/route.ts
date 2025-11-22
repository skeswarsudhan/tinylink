import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

type RouteProps = {
  params: Promise<{
    code: string;
  }>;
};

export async function GET(req: NextRequest, props: RouteProps) {
  const { code } = await props.params; // ✅ FIX

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(data);
}

export async function DELETE(req: NextRequest, props: RouteProps) {
  const { code } = await props.params; // ✅ FIX

  await supabase.from("links").delete().eq("code", code);
  return new Response("OK", { status: 200 });
}
