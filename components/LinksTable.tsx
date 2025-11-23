"use client";

import { useEffect, useState } from "react";
import { Copy, Trash2, ExternalLink, TrendingUp, MousePointer, Clock, Link2 } from "lucide-react";
import styles from "./LinksTable.module.css";

type LinkRow = {
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
};

export default function LinksTable() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [copiedCode, setCopiedCode] = useState("");

  async function load() {
    const res = await fetch("/api/links");
    const data: LinkRow[] = await res.json();
    setLinks(data);
  }

  async function del(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    load();
  }

  function copyToClipboard(code: string) {
    const fullUrl = `${window.location.origin}/code/${code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
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
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.iconBox}>
            <TrendingUp className={styles.iconWhite} />
          </div>
          <div>
            <h2 className={styles.cardTitle}>Your Links</h2>
            <p className={styles.subtitle}>{links.length} active links</p>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.th}>Short Code</th>
              <th className={styles.th}>Destination</th>
              <th className={styles.th}>Clicks</th>
              <th className={styles.th}>Last Clicked</th>
              <th className={styles.thRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((x) => (
              <tr key={x.code} className={styles.tableRow}>
                <td className={styles.td}>
                  <div className={styles.codeCell}>
                    <a 
                      href={`/code/${x.code}`}
                      className={styles.codeLink}
                    >
                      {x.code}
                    </a>
                    <button
                      onClick={() => copyToClipboard(x.code)}
                      className={styles.copyButton}
                      title="Copy link"
                    >
                      {copiedCode === x.code ? (
                        <span className={styles.checkmark}>✓</span>
                      ) : (
                        <Copy className={styles.icon} />
                      )}
                    </button>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.urlCell}>
                    <ExternalLink className={styles.icon} />
                    <span className={styles.urlText}>{x.url}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.clicksCell}>
                    <MousePointer className={styles.icon} />
                    <span className={styles.clicksText}>
                      {x.clicks.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.dateCell}>
                    <Clock className={styles.icon} />
                    <span className={styles.dateText}>
                      {x.last_clicked
                        ? new Date(x.last_clicked).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : "Never"}
                    </span>
                  </div>
                </td>
                <td className={styles.tdRight}>
                  <button
                    onClick={() => del(x.code)}
                    className={styles.deleteButton}
                  >
                    <Trash2 className={styles.deleteIcon} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {links.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Link2 className={styles.emptyIconSvg} />
          </div>
          <h3 className={styles.emptyTitle}>No links yet</h3>
          <p className={styles.emptyText}>Create your first short link to get started</p>
        </div>
      )}
    </div>
  );
}
