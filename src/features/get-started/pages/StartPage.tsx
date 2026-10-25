import { ProblemScenes } from '../components/ProblemScenes';
import { PhoneMock } from '../components/PhoneMock';
import { SiteClose } from '../components/SiteClose';
import { SpendMap } from '../components/SpendMap';
import { ProofRow, StartCopy } from '../components/StartCopy';
import { StartNav } from '../components/StartNav';
import styles from '../StartPage.module.css';

const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&display=swap';

function ensureFonts() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('start-screen-fonts')) return;
  const link = document.createElement('link');
  link.id = 'start-screen-fonts';
  link.rel = 'stylesheet';
  link.href = FONT_STYLESHEET;
  document.head.append(link);
}

ensureFonts();

export function StartPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ground} aria-hidden>
        <div className={styles.groundWords}>
          {['Track', 'settle', 'budget', 'trips', 'analytics', 'merchants', 'places'].map((word) => (
            <p key={word} className={styles.watermark}>{word}</p>
          ))}
        </div>
      </div>
      <div className={styles.surface}>
        <div className={styles.frame}>
          <StartNav />
          <div className={styles.layout}>
            <StartCopy />
            <PhoneMock />
          </div>
        </div>
        <div className={styles.rest}>
          <section className={styles.proofBand} aria-label="Product facts">
            <ProofRow />
          </section>
          <div className={styles.below}>
            <ProblemScenes />
          </div>
          <SpendMap />
          <div className={styles.below}>
            <SiteClose />
          </div>
        </div>
      </div>
    </main>
  );
}
