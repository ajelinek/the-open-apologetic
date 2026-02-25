// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://the-open-apologetic.com',
  base: '/the-open-apologetic',
  integrations: [sitemap()],
});
