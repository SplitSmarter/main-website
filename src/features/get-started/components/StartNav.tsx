import { Link } from 'react-router';
import { brand, startNav } from '@/content/product';
import styles from '../StartPage.module.css';

export function StartNav() {
  return (
    <header className={styles.nav}>
      <Link className={styles.logo} to="/">{brand}</Link>
      <nav className={styles.pills} aria-label="Product">
        {startNav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className={styles.login} href="#start">Get started</a>
    </header>
  );
}
