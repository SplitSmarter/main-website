import { spendMap } from '@/content/product';
import styles from '../StartPage.module.css';

export function SpendMap() {
  return (
    <section className={styles.mapBand} id="map">
      <div className={styles.mapCopy}>
        <h2>{spendMap.title}</h2>
        <p>{spendMap.lede}</p>
      </div>
    </section>
  );
}
