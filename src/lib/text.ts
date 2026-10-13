const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const TBC = /\[TO CONFIRM:[^\]]*\]/;

/** True when the text is still a [TO CONFIRM: …] placeholder (or empty). */
export const isPlaceholder = (s?: string) => !s || TBC.test(s);

/**
 * Turns content text into safe HTML:
 *  - [TO CONFIRM: …] becomes a highlighted placeholder
 *  - **bold** becomes bold
 */
export function rich(s: string = ''): string {
  return escape(String(s))
    .replace(/\[TO CONFIRM:[^\]]*\]/g, (m) => `<mark class="tbc">${m}</mark>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Splits text on blank lines into paragraphs. */
export const paragraphs = (s: string = '') =>
  String(s).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
