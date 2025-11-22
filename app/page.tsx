import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">TinyLink Dashboard</h1>

      <LinkForm />
      <LinksTable />
    </div>
  );
}
