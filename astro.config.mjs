// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ajelinek.github.io/the-open-apologetic-wks',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
