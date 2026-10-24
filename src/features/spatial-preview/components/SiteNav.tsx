import { Link } from 'react-router';
import { brand, previewNav } from '@/content/product';
import styles from '../SpatialPreview.module.css';

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 22 22" aria-hidden>
      <rect x="1" y="1" width="20" height="20" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" />
      <path d="M6.5 11h9M11 6.5v9" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="16.2" cy="5.8" r="1.7" fill="var(--danger)" />
    </svg>
  );
}

export function SiteNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <Mark />
        <span>{brand}</span>
      </div>

      <nav className={styles.links} aria-label="Preview">
        {previewNav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>

      <div className={styles.navActions}>
        <Link className={styles.login} to="/">Home</Link>
        <a className={styles.start} href="#budget">Sample</a>
      </div>
    </header>
  );
}
