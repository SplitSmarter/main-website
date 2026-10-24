import { IconArrowRight, IconMapPin } from '@tabler/icons-react';
import { hero } from '@/content/product';
import styles from '../SpatialPreview.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>
        <IconMapPin size={14} stroke={1.6} />
        {hero.eyebrow}
      </p>
      <h1 className={styles.heroTitle}>
        {hero.title}
        <br />
        <em>{hero.accent}</em>
      </h1>
      <p className={styles.lede}>{hero.lede}</p>
      <a className={styles.cta} href={hero.ctaHref}>
        {hero.cta}
        <span className={styles.ctaArrow}>
          <IconArrowRight size={15} stroke={1.7} />
        </span>
      </a>
    </section>
  );
}
