import { defineCollection, z } from 'astro:content';

const prayers = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const stories = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { prayers, stories, pages };
