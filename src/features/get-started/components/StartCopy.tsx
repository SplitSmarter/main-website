import { IconArrowRight, IconCoins, IconLanguage, IconStar } from '@tabler/icons-react';
import { getStarted, proof } from '@/content/product';
import styles from '../StartPage.module.css';

const proofIcons = {
  language: IconLanguage,
  currency: IconCoins,
  review: IconStar,
};

export function StartCopy() {
  return (
    <section className={styles.copy} id="start">
      <h1>{getStarted.headline}</h1>
      <p>{getStarted.lede}</p>
      <a className={styles.cta} href="#phone">
        {getStarted.cta}
        <span>
          <IconArrowRight size={16} stroke={2.2} />
        </span>
      </a>
    </section>
  );
}

export function ProofRow() {
  return (
    <ul className={styles.proof}>
      {proof.map((item) => {
        const Icon = proofIcons[item.icon];
        return (
          <li key={item.label}>
            <Icon className={styles.proofIcon} size={64} stroke={1.4} aria-hidden />
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
