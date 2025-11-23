"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import styles from "./LinkForm.module.css";

export default function LinkForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

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
    setSuccess(true);
    setUrl("");
    setCode("");
    
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconBox}>
          <Link2 className={styles.iconWhite} />
        </div>
        <h2 className={styles.cardTitle}>Create Short Link</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Destination URL
          </label>
          <input
            type="url"
            required
            className={styles.input}
            placeholder="https://example.com/your-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Custom Code (optional)
          </label>
          <input
            className={styles.input}
            placeholder="my-custom-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorDot}></span>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            <span className={styles.successDot}></span>
            Link created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            <span className={styles.loadingContainer}>
              <span className={styles.spinner}></span>
              Creating...
            </span>
          ) : (
            "Create Short Link"
          )}
        </button>
      </form>
    </div>
  );
}
