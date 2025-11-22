import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

type Params = {
  params: {
    code: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !data) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(data);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await supabase.from("links").delete().eq("code", params.code);
  return new Response("OK", { status: 200 });
}
