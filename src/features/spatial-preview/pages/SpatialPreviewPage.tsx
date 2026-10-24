import { Hero } from '../components/Hero';
import { LedgerCards } from '../components/LedgerCards';
import { ProblemBento } from '../components/ProblemBento';
import { ProductFrame } from '../components/ProductFrame';
import { SiteNav } from '../components/SiteNav';
import { SurfaceRow } from '../components/SurfaceRow';
import styles from '../SpatialPreview.module.css';

const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap';

function ensureSpatialFonts() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('spatial-expense-fonts')) return;

  const preconnect = document.createElement('link');
  preconnect.id = 'spatial-expense-preconnect';
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://fonts.googleapis.com';

  const preconnectStatic = document.createElement('link');
  preconnectStatic.id = 'spatial-expense-preconnect-static';
  preconnectStatic.rel = 'preconnect';
  preconnectStatic.href = 'https://fonts.gstatic.com';
  preconnectStatic.crossOrigin = 'anonymous';

  const link = document.createElement('link');
  link.id = 'spatial-expense-fonts';
  link.rel = 'stylesheet';
  link.href = FONT_STYLESHEET;

  document.head.append(preconnect, preconnectStatic, link);
}

ensureSpatialFonts();

export function SpatialPreviewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.stage} aria-hidden />
      <div className={styles.vignette} aria-hidden />
      <div className={styles.shell}>
        <SiteNav />
        <Hero />
        <LedgerCards />
        <SurfaceRow />
        <ProblemBento />
        <ProductFrame />
      </div>
    </div>
  );
}
