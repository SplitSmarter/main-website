import { brand, siteClose } from '@/content/product';
import { env } from '@/config/env';
import styles from '../StartPage.module.css';

export function SiteClose() {
  const guideUrl = env.guideUrl.trim();

  return (
    <footer className={styles.close}>
      <p className={styles.closeBrand}>{brand}</p>
      <p>{siteClose.privacy}</p>
      {guideUrl ? (
        <a href={guideUrl}>{siteClose.guide}</a>
      ) : (
        <p>{siteClose.guide}</p>
      )}
    </footer>
  );
}
