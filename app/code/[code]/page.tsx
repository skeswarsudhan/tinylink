import { supabase } from "@/lib/supabase";
import { BarChart3, MousePointer, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./StatsPage.module.css";
import CopyButton from "@/components/CopyButton";

type StatsPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function StatsPage(props: StatsPageProps) {
  const { code } = await props.params;  

  const supabase_client = supabase;

  const { data, error } = await supabase_client
    .from("links")
    .select("*")
    .eq("code", code)
    .single();

  if (error || !data) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundCard}>
          <div className={styles.notFoundIcon}>
            <span className={styles.notFoundEmoji}>🔍</span>
          </div>
          <h1 className={styles.notFoundTitle}>Link Not Found</h1>
          <p className={styles.notFoundText}>The short link you're looking for doesn't exist.</p>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft className={styles.backIcon} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft className={styles.backLinkIcon} />
          Back to Dashboard
        </Link>

        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.iconLarge}>
              <BarChart3 className={styles.iconWhite} />
            </div>
            <div>
              <h1 className={styles.title}>Link Statistics</h1>
              <p className={styles.subtitle}>Analytics for /{code}</p>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIconBlue}>
                <MousePointer className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statLabel}>Total Clicks</p>
                <p className={styles.statValue}>{data.clicks.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIconPurple}>
                <Clock className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statLabel}>Last Clicked</p>
                <p className={styles.statValueSmall}>
                  {data.last_clicked
                    ? new Date(data.last_clicked).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "Never"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.urlCard}>
          <div className={styles.urlCardHeader}>
            <div className={styles.urlIconBox}>
              <ExternalLink className={styles.urlIcon} />
            </div>
            <h2 className={styles.urlCardTitle}>Destination URL</h2>
          </div>
          
          <div className={styles.urlDisplay}>
            <p className={styles.urlText}>{data.url}</p>
          </div>

          <div className={styles.shortLinkSection}>
            <div className={styles.shortLinkContent}>
              <div>
                <p className={styles.shortLinkLabel}>Short Link</p>
                <code className={styles.shortLinkCode}>
                  /code/{code}
                </code>
              </div>
              <CopyButton code={code} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
