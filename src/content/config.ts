import { defineCollection, z } from 'astro:content';

const evidence = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['scientific', 'historical', 'biblical', 'philosophy', 'doctrine']),
    icon: z.string().optional(),
    externalResources: z.array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        type: z.enum(['book', 'video', 'article', 'website']).optional(),
      })
    ).optional().default([]),
  }),
});

export const collections = { evidence };
