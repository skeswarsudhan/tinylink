import { supabase } from "@/lib/supabase";
import { isValidUrl, isValidCode, randomCode } from "@/lib/validation";

export async function GET() {
  const { data } = await supabase.from("links").select("*").order("created_at", { ascending: false });

  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { url, code } = body;

  if (!isValidUrl(url)) {
    return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
  }

  const finalCode = code?.length ? code : randomCode();

  if (!isValidCode(finalCode)) {
    return new Response(JSON.stringify({ error: "Invalid code" }), { status: 400 });
  }

  const { error } = await supabase.from("links").insert({
    code: finalCode,
    url
  });

  if (error) {
    return new Response(JSON.stringify({ error: "Code already exists" }), { status: 409 });
  }

  return Response.json({ code: finalCode });
}
