import { defineCollection, z } from 'astro:content';

const prayers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(200),
    date: z.coerce.date(),
    author: z.string().min(1),
    summary: z.string().min(10).max(500),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(200),
    date: z.coerce.date(),
    location: z.string().min(1),
    author: z.string().min(1),
    summary: z.string().min(10).max(1000),
    impact: z.string().min(10),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(10).max(500),
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { prayers, stories, pages };
