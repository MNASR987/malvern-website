import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import themeJson from '../../theme.json';

export type Lang = 'en' | 'ar';
export const languages: Record<Lang, { dir: 'ltr' | 'rtl'; label: string }> = {
  en: { dir: 'ltr', label: 'English' },
  ar: { dir: 'rtl', label: 'العربية' },
};

const root = join(process.cwd(), 'content');

function readYaml(path: string) {
  return parse(readFileSync(path, 'utf8')) ?? {};
}

/** Loads content/<lang>/<name>.yaml, falling back to English if a translation is missing. */
export function getPage<T = any>(name: string, lang: Lang = 'en'): T {
  const file = join(root, lang, `${name}.yaml`);
  return readYaml(existsSync(file) ? file : join(root, 'en', `${name}.yaml`)) as T;
}

export const settings = readYaml(join(root, 'settings.yaml')) as any;
export const theme = themeJson;
