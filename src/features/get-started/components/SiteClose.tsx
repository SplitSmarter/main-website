import { brand, getStarted, siteClose, socialLinks } from '@/content/product';
import { env } from '@/config/env';
import styles from '../StartPage.module.css';

function guideBasePath(pathname: string) {
  const path = pathname.replace(/\/$/, '');
  if (path === '' || path === '/' || path === '/en' || path === '/hi' || path === '/zh') return '';
  return path.replace(/\/(en|hi|zh)$/, '');
}

function guideHref(page: string) {
  const raw = env.guideUrl.trim();
  if (!raw) return null;
  if (!page) return raw;
  if (raw.startsWith('/')) return `${guideBasePath(raw)}${page}`;
  try {
    const url = new URL(raw);
    return `${url.origin}${guideBasePath(url.pathname)}${page}`;
  } catch {
    return null;
  }
}

type SiteCloseProps = {
  onGetStarted: () => void;
};

export function SiteClose({ onGetStarted }: SiteCloseProps) {
  const year = new Date().getFullYear();
  const privacyHref = guideHref(siteClose.privacyLink.path);

  return (
    <footer className={styles.close}>
      <div className={styles.closeTop}>
        <div className={styles.closeBrandBlock}>
          <p className={styles.closeBrand}>
            <img src="/brand/mark-tile-dark.svg" alt="" width={32} height={32} />
            {brand}
          </p>
          <p className={styles.closeLede}>{getStarted.lede}</p>
        </div>
        <nav className={styles.closeCol} aria-label={siteClose.guideTitle}>
          <h2>{siteClose.guideTitle}</h2>
          {siteClose.guide.map((item) => {
            const href = guideHref(item.path);
            if (href) return <a key={item.label} href={href}>{item.label}</a>;
            if (!item.path) return <p key={item.label}>{item.label}</p>;
            return null;
          })}
        </nav>
        <nav className={styles.closeCol} aria-label="Follow Split Smarter">
          <h2>Follow</h2>
          {socialLinks.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.closeCol}>
          <h2>{siteClose.privacyTitle}</h2>
          <p>{siteClose.privacy}</p>
          {privacyHref ? <a href={privacyHref}>{siteClose.privacyLink.label}</a> : null}
        </div>
      </div>
      <div className={styles.closeLegal}>
        <p>© {year} {brand}</p>
        <a href={`mailto:${siteClose.email}`}>{siteClose.email}</a>
        <button type="button" onClick={onGetStarted}>{siteClose.start}</button>
      </div>
    </footer>
  );
}
