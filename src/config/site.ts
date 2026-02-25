export const baseUrl = '/the-open-apologetic';

export const routes = {
  home: () => `${baseUrl}/`,
  evidence: () => `${baseUrl}/evidence`,
  evidenceCategory: (category: string) => `${baseUrl}/evidence/${category}`,
  evidenceArticle: (slug: string) => `${baseUrl}/evidence/${slug}`,
  stories: () => `${baseUrl}/stories`,
  testimonies: () => `${baseUrl}/stories/testimonies`,
  miracles: () => `${baseUrl}/stories/miracles`,
} as const;

export const siteConfig = {
  baseUrl,
  github: 'https://github.com/ajelinek/the-open-apologetic',
};
