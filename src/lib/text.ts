const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const TBC = /\[TO CONFIRM:[^\]]*\]/;

/** True when the text is still a [TO CONFIRM: …] placeholder (or empty). */
export const isPlaceholder = (s?: string) => !s || TBC.test(s);

/** Text with any [TO CONFIRM: …] removed; empty string if nothing real is left. */
export const real = (s?: string) => String(s ?? '').replace(/\s*\[TO CONFIRM:[^\]]*\]/g, '').trim();

/**
 * Turns content text into safe HTML:
 *  - [TO CONFIRM: …] notes are hidden from visitors (they stay in the content files as reminders)
 *  - **bold** becomes bold
 */
export function rich(s: string = ''): string {
  return escape(String(s))
    .replace(/\s*\[TO CONFIRM:[^\]]*\]/g, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Splits text on blank lines into paragraphs (placeholder-only paragraphs are dropped). */
export const paragraphs = (s: string = '') =>
  String(s).split(/\n\s*\n/).map((p) => p.trim()).filter((p) => real(p));
