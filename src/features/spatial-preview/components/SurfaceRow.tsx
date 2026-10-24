import { surfaces } from '@/content/product';
import styles from '../SpatialPreview.module.css';

export function SurfaceRow() {
  return (
    <section className={styles.trust} id="groups">
      <p>{surfaces.caption}</p>
      <ul>
        {surfaces.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
