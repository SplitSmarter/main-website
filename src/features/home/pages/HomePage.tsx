import { Link } from 'react-router';
import styles from '../HomePage.module.css';

export function HomePage() {
  return (
    <main className={styles.page}>
      <p className={styles.kicker}>Split Smarter</p>
      <h1>The site is being designed.</h1>
      <p>This page will show the product when the screen is final.</p>
      <span className={styles.links}>
        <Link to="/dev/spatial">City glass</Link>
        <Link to="/dev/start">Get started</Link>
        <Link to="/dev/workflow">Graph</Link>
      </span>
    </main>
  );
}
