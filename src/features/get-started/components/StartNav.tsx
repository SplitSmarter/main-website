import { useEffect, useId, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router';
import { brand, startNav } from '@/content/product';
import styles from '../StartPage.module.css';
import { GetStartedLink } from './GetStartedLink';

type StartNavProps = {
  onGetStarted: () => void;
};

export function StartNav({ onGetStarted }: StartNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className={styles.nav}>
      <Link className={styles.logo} to="/">
        <img src="/brand/mark-tile-dark.svg" alt="" width={32} height={32} />
        {brand}
      </Link>
      <nav className={styles.pills} aria-label="Product">
        {startNav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
        <Link to="/pricing">Pricing</Link>
      </nav>
      <button
        type="button"
        className={styles.menuBtn}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen(true)}
      >
        <IconMenu2 size={20} stroke={1.8} />
        <span className={styles.visuallyHidden}>Open menu</span>
      </button>
      <GetStartedLink className={styles.login} onGetStarted={onGetStarted}>
        Get started
      </GetStartedLink>
      {menuOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setMenuOpen(false)}>
          <aside
            className={styles.drawer}
            id={menuId}
            aria-label="Product"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.drawerHead}>
              <strong>
                <img src="/brand/mark-tile-dark.svg" alt="" width={28} height={28} />
                {brand}
              </strong>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <IconX size={18} stroke={1.8} />
              </button>
            </div>
            {startNav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <GetStartedLink
              className={styles.drawerCta}
              onGetStarted={() => {
                setMenuOpen(false);
                onGetStarted();
              }}
            >
              Get started
            </GetStartedLink>
          </aside>
        </div>
      )}
    </header>
  );
}
