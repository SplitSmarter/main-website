import { IconArrowRight, IconCoins, IconLanguage, IconTag } from '@tabler/icons-react';
import { getStarted, proof } from '@/content/product';
import styles from '../StartPage.module.css';
import { GetStartedLink } from './GetStartedLink';

const proofIcons = {
  language: IconLanguage,
  currency: IconCoins,
  price: IconTag,
};

type StartCopyProps = {
  onGetStarted: () => void;
};

export function StartCopy({ onGetStarted }: StartCopyProps) {
  return (
    <section className={styles.copy} id="get-started">
      <h1>{getStarted.headline}</h1>
      <p>{getStarted.lede}</p>
      <GetStartedLink className={styles.cta} onGetStarted={onGetStarted}>
        {getStarted.cta}
        <span>
          <IconArrowRight size={16} stroke={2.2} />
        </span>
      </GetStartedLink>
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
