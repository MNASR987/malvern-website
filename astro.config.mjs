// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import siteConfig from './site.config.mjs';

const { customDomain, githubUser, githubRepo } = siteConfig;
const site = customDomain ? `https://${customDomain}` : `https://${githubUser}.github.io`;
const base = customDomain ? '/' : `/${githubRepo}`;

/** Writes the CNAME file GitHub Pages needs for a custom domain. */
const cname = {
  name: 'cname',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (customDomain) writeFileSync(fileURLToPath(new URL('CNAME', dir)), customDomain + '\n');
    },
  },
};

/** Hides [TO CONFIRM: …] notes inside Markdown pages (privacy policy, news). */
function rehypeTbc() {
  const re = /\[TO CONFIRM:[^\]]*\]/g;
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type !== 'text' || !re.test(child.value)) return walk(child), [child];
      re.lastIndex = 0;
      const out = [];
      let last = 0;
      for (const m of child.value.matchAll(re)) {
        if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
        last = m.index + m[0].length;
      }
      if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
      return out;
    });
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  markdown: { processor: unified({ rehypePlugins: [rehypeTbc] }) },
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap(), cname],
});
