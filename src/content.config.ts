import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  // Files starting with "_" (like _TEMPLATE.md) are ignored.
  loader: glob({ pattern: '[^_]*.md', base: './content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['news', 'event']).default('news'),
    eventDate: z.coerce.date().optional(),
    summary: z.string().default(''),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '{en,ar}/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = { news, pages };
