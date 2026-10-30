import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { IconX } from '@tabler/icons-react';
import styles from '../StartPage.module.css';

type NotifyDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function NotifyDialog({ open, onClose }: NotifyDialogProps) {
  if (!open) return null;
  return <NotifyDialogPanel onClose={onClose} />;
}

function NotifyDialogPanel({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = contact.trim();
    if (!value) {
      setError('Enter an email or phone number.');
      return;
    }
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/public/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: value }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(typeof body?.detail === 'string' ? body.detail : 'Try again in a moment.');
        return;
      }
      setSaved(true);
    } catch {
      setError('Try again in a moment.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={styles.notifyBackdrop} onClick={onClose}>
      <div
        className={styles.notifyDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.notifyHead}>
          <h2 id={titleId}>Get started</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <IconX size={18} stroke={1.8} />
          </button>
        </div>
        {saved ? (
          <p>We'll send the details.</p>
        ) : (
          <form className={styles.notifyForm} onSubmit={onSubmit}>
            <p>Enter your email or phone. We'll send the details.</p>
            <input
              ref={inputRef}
              name="contact"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="Email or phone"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
            {error ? <p className={styles.notifyError}>{error}</p> : null}
            <button type="submit" disabled={pending}>
              {pending ? 'Sending…' : 'Notify me'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
