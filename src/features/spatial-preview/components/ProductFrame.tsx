import { sampleGroup, solution } from '@/content/product';
import styles from '../SpatialPreview.module.css';

export function ProductFrame() {
  return (
    <section className={styles.solution} id="budget">
      <p className={styles.eyebrow}>
        <span className={styles.dot} />
        {solution.eyebrow}
      </p>
      <h2 className={styles.sectionTitle}>
        {solution.title}
        <br />
        <em>{solution.accent}</em>
      </h2>
      <p className={styles.lede}>{solution.lede}</p>

      <div className={styles.frame}>
        <div className={styles.frameBar}>
          <span className={styles.dots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <strong>{sampleGroup.name}</strong>
          <span className={styles.frameMeta}>{sampleGroup.meta}</span>
        </div>
        <div className={styles.frameBody}>
          <ol className={styles.steps}>
            {sampleGroup.steps.map((step) => (
              <li key={step} className={step === sampleGroup.activeStep ? styles.stepOn : undefined}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className={styles.frameMain}>
            <div className={styles.featureCharge}>
              <div>
                <p>{sampleGroup.feature.title}</p>
                <strong>{sampleGroup.feature.amount}</strong>
              </div>
              <span>{sampleGroup.feature.note}</span>
            </div>
            <ul className={styles.ledgerRows}>
              {sampleGroup.rows.map((row) => (
                <li key={row.place}>
                  <span>
                    <strong>{row.place}</strong>
                    <small>{row.kind}</small>
                  </span>
                  <span>
                    <strong>{row.amount}</strong>
                    <small>{row.who}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.owed}>
            <p>{sampleGroup.owed.label}</p>
            <strong>{sampleGroup.owed.amount}</strong>
            <span>{sampleGroup.owed.note}</span>
            <div className={styles.miniBars} aria-hidden>
              {sampleGroup.owed.bars.map((height) => (
                <i key={height} style={{ height }} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
