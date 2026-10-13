import type { ImageMetadata } from 'astro';

const byName = (files: Record<string, { default: ImageMetadata }>) =>
  Object.fromEntries(
    Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.toLowerCase(), mod.default]),
  );

/** Every image in the "brand" folder, by file name (e.g. "logo.png"). */
export const brand: Record<string, ImageMetadata> = byName(
  import.meta.glob('/brand/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}', { eager: true }),
);

export const brandImage = (name?: string) => (name ? brand[name.toLowerCase()] : undefined);

export const logo = ['logo.svg', 'logo.png', 'logo.webp', 'logo.jpg'].map((n) => brand[n]).find(Boolean);
export const logoWhite = ['logo-white.svg', 'logo-white.png', 'logo-white.webp'].map((n) => brand[n]).find(Boolean);
export const heroImage = ['hero.jpg', 'hero.jpeg', 'hero.webp', 'hero.png'].map((n) => brand[n]).find(Boolean);

/**
 * Posters for "Offers & Announcements": every image in content/offers.
 * Newest file name first (so names starting with a date sort nicely).
 * The file name becomes the description for screen readers:
 *   "2026-10-early-registration.jpg" → "Early registration"
 */
const offerFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/content/offers/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true },
);

export const offers = Object.entries(offerFiles)
  .map(([path, mod]) => {
    const file = path.split('/').pop()!;
    const words = file
      .replace(/\.[^.]+$/, '')
      .replace(/^\d{4}(-\d{1,2}){0,2}[-_ ]*/, '')
      .replace(/[-_]+/g, ' ')
      .trim();
    const alt = words ? words[0].toUpperCase() + words.slice(1) : 'Announcement';
    return { file, alt, image: mod.default };
  })
  .sort((a, b) => b.file.localeCompare(a.file));
