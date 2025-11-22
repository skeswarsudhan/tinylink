"use client";

import { useEffect, useState } from "react";

type LinkRow = {
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
};

export default function LinksTable() {
  const [links, setLinks] = useState<LinkRow[]>([]);

  async function load() {
    const res = await fetch("/api/links");
    const data: LinkRow[] = await res.json();
    setLinks(data);
  }

  async function del(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
  let mounted = true;

  async function fetchLinks() {
    const res = await fetch("/api/links");
    const data: LinkRow[] = await res.json();

    if (mounted) setLinks(data);
  }

  fetchLinks();

  return () => {
    mounted = false;
  };
}, []);


  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Code</th>
          <th className="p-2">URL</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">Last Clicked</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {links.map((x) => (
          <tr key={x.code} className="border-t">
            <td className="p-2">
              <a className="text-blue-600" href={`/code/${x.code}`}>
                {x.code}
              </a>
            </td>
            <td className="p-2 truncate max-w-md">{x.url}</td>
            <td className="p-2">{x.clicks}</td>
            <td className="p-2">
              {x.last_clicked
                ? new Date(x.last_clicked).toLocaleString()
                : "-"}
            </td>
            <td className="p-2">
              <button
                className="text-red-600"
                onClick={() => del(x.code)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
