"use client";

import { useState } from "react";
import styles from "./CopyButton.module.css";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/code/${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className={styles.copyLinkButton}>
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}