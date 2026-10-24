import { IconStar } from '@tabler/icons-react';
import { voices } from '@/content/product';
import styles from '../StartPage.module.css';

function ReviewCard({
  name,
  initial,
  stars,
  quote,
}: (typeof voices.reviews)[number]) {
  return (
    <li className={styles.voiceCard}>
      <p>{quote}</p>
      <div className={styles.voiceStars} aria-label={`${stars} stars`}>
        {Array.from({ length: stars }, (_, index) => (
          <IconStar key={index} size={14} stroke={1.6} fill="currentColor" />
        ))}
      </div>
      <div className={styles.voicePerson}>
        <span className={styles.initial} aria-hidden>{initial}</span>
        <strong>{name}</strong>
      </div>
    </li>
  );
}

export function Voices() {
  const rows = [voices.reviews, voices.reviews];

  return (
    <section className={styles.voices} id={voices.id} aria-label={voices.title}>
      <div className={styles.voiceCopy}>
        <p className={styles.voiceSample}>{voices.sample}</p>
        <h2>{voices.title}</h2>
      </div>
      <div className={styles.marquee}>
        <div className={styles.reel}>
          {rows.map((reviews, row) => (
            <ul key={row} aria-hidden={row === 1 || undefined}>
              {reviews.map((review, index) => (
                <ReviewCard key={`${review.name}-${index}`} {...review} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
