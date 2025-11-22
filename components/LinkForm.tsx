"use client";

import { useState } from "react";

export default function LinkForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, code }),
    });

    if (res.status === 409) {
      setError("Code already exists");
      setLoading(false);
      return;
    }

    setLoading(false);
    setUrl("");
    setCode("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        className="border p-2 flex-1"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="border p-2 w-32"
        placeholder="code?"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button disabled={loading} className="bg-blue-600 text-white px-3 py-2">
        Add
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
