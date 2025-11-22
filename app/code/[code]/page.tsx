
import { supabase } from "@/lib/supabase";

type StatsPageProps = {
  params: {
    code: string;
  };
};

export default async function StatsPage({ params }: StatsPageProps) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !data) return <h1>Not Found</h1>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Stats: {params.code}</h1>

      <div className="space-y-2">
        <p><b>URL:</b> {data.url}</p>
        <p><b>Total Clicks:</b> {data.clicks}</p>
        <p><b>Last Clicked:</b> {data.last_clicked 
          ? new Date(data.last_clicked).toLocaleString() 
          : "-"}</p>
      </div>
    </div>
  );
}
