import LinkForm from "@/components/LinkForm";
import LinksTable from "@/components/LinksTable";
import { Link2 } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.iconLarge}>
              <Link2 className={styles.iconWhite} />
            </div>
            <div>
              <h1 className={styles.title}>TinyLink Dashboard</h1>
              <p className={styles.subtitle}>Shorten, share, and track your links</p>
            </div>
          </div>
        </div>

        <LinkForm />
        <LinksTable />
      </div>
    </div>
  );
}
