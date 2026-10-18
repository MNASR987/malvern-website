import type { Lang } from './content';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds a link that respects the site's base path ("/" on www.malvern.edu.sa, "/malvern-website" on github.io). */
export function href(path: string, lang: Lang = 'en'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return `${base}${prefix}${path.startsWith('/') ? path : '/' + path}`;
}

/** Link to a file in the public folder (e.g. /files/calendar.pdf). */
export const asset = (path: string) => `${base}/${path.replace(/^\//, '')}`;
