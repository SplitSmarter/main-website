import { useEffect } from 'react';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.setAttribute('content', content);
}

export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const url = path === '/' ? 'https://splitsmarter.app/' : `https://splitsmarter.app${path}`;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [title, description, path]);
}
