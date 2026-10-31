import { answers } from '@/content/product';
import styles from '../StartPage.module.css';

export function Answers() {
  return (
    <section className={styles.answers} aria-label="Answers">
      {answers.map((item) => (
        <details key={item.question}>
          <summary>
            <h2>{item.question}</h2>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
