import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { IconX } from '@tabler/icons-react';
import { socialLinks } from '@/content/product';
import styles from '../StartPage.module.css';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.1 9.3H4.7v9.4h2.4V9.3zM5.9 4.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zM19.3 13.1c0-2.7-1.4-4-3.4-4-1.6 0-2.3.9-2.7 1.5V9.3H10.8c0 1.3 0 9.4 0 9.4h2.4v-5.2c0-.3 0-.6.1-.8.3-.6.9-1.3 1.9-1.3 1.3 0 1.9 1 1.9 2.5v4.8h2.4V13.1z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id="notify-instagram" cx="30%" cy="110%" r="140%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#notify-instagram)" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.7" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.7" r="0.9" fill="#fff" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M12.1 5.6a6.3 6.3 0 0 0-5.4 9.5l-.5 2.6 2.7-.7a6.3 6.3 0 1 0 3.2-11.4zm3.5 8.9c-.15.42-.86.8-1.2.85-.3.05-.7.08-1.12-.07-.26-.09-.6-.19-1.02-.38-1.8-.78-3-2.6-3.08-2.72-.09-.12-.72-.96-.72-1.83s.45-1.3.61-1.47c.15-.17.34-.21.45-.21h.32c.1 0 .25-.04.4.3.15.36.51 1.23.55 1.32.05.09.08.19.02.31-.07.12-.1.19-.2.3-.09.1-.19.23-.27.31-.09.09-.18.18-.08.34.1.17.47.77 1 1.24.69.61 1.26.8 1.43.89.17.09.27.08.38-.05.1-.13.45-.52.57-.7.12-.17.24-.14.4-.08.16.05 1.05.5 1.23.59.18.09.3.13.34.2.04.08.04.43-.1.85z"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#5865F2"
        d="M19.27 5.33A17.5 17.5 0 0 0 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.3 16.3 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09A.1.1 0 0 0 9 4a17.4 17.4 0 0 0-4.27 1.33c-.01 0-.02.01-.03.02C2 9.42 1.24 13.38 1.6 17.3c0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.04.08.05.12.04 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-.99 0-1.8-.91-1.8-2.02s.81-2.02 1.8-2.02 1.8.91 1.8 2.02-.81 2.02-1.8 2.02zm6.97 0c-.99 0-1.8-.91-1.8-2.02s.81-2.02 1.8-2.02 1.8.91 1.8 2.02-.81 2.02-1.8 2.02z"
      />
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  WhatsApp: WhatsAppIcon,
  LinkedIn: LinkedInIcon,
  Discord: DiscordIcon,
} as const;

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
          <p>Thanks. We'll send you the latest updates.</p>
        ) : (
          <form className={styles.notifyForm} onSubmit={onSubmit}>
            <p>
              We're in closed testing. Please leave your email or phone so we can send you the latest
              updates.
            </p>
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
        <nav className={styles.notifySocial} aria-label="Follow Split Smarter">
          {socialLinks.map(({ href, label }) => {
            const Icon = socialIcons[label];
            return (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Icon />
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
