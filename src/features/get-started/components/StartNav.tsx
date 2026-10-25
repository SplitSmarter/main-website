import { useEffect, useId, useRef, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link } from 'react-router';
import { brand, startNav } from '@/content/product';
import styles from '../StartPage.module.css';

export function StartNav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tipId = useId();
  const menuId = useId();
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!priceRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
      <Link className={styles.logo} to="/">{brand}</Link>
      <nav className={styles.pills} aria-label="Product">
        {startNav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
        <div className={styles.price} ref={priceRef}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={tipId}
            onClick={() => setOpen((value) => !value)}
          >
            Pricing
          </button>
          {open && (
            <p className={styles.priceTip} id={tipId} role="status">
              <strong>It's free.</strong>
              Track every expense.
            </p>
          )}
        </div>
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
      <a className={styles.login} href="#start">Get started</a>
      {menuOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setMenuOpen(false)}>
          <aside
            className={styles.drawer}
            id={menuId}
            aria-label="Product"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.drawerHead}>
              <strong>{brand}</strong>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <IconX size={18} stroke={1.8} />
              </button>
            </div>
            {startNav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <p className={styles.drawerPrice}>
              <strong>Pricing</strong>
              It's free. Track every expense.
            </p>
            <a className={styles.drawerCta} href="#start" onClick={() => setMenuOpen(false)}>
              Start for free
            </a>
          </aside>
        </div>
      )}
    </header>
  );
}
