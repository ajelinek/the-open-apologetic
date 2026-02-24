# Architecture Guidance — Evidence of Christ Website

This document provides architectural recommendations for the Astro.js apologetics website based on your requirements and the vibing ruleset.

## 1. Project Structure

**Recommended structure aligned with @vibing/rules/astro.js/astro-project-structure.md:**

```
src/
├── components/
│   ├── foundation/           # Base UI components per UI project structure
│   │   ├── Button/
│   │   ├── Callout/         # Evidence callout boxes
│   │   ├── Card/            # Evidence cards
│   │   └── ResourceLink/   # External resource link styling
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── MegaMenu/        # Evidence mega-menu with categories
│   │   └── SkipLink/        # Accessibility skip navigation
│   ├── evidence/            # Evidence-specific components
│   │   ├── FineTunedUniverse/
│   │   ├── DnaEvidence/
│   │   ├── ManuscriptEvidence/
│   │   ├── PropheticProbability/
│   │   ├── GospelConsistency/
│   │   ├── FlawedHeroes/
│   │   ├── EucharisticMiracles/
│   │   ├── IncorruptibleSaints/
│   │   └── ApostleMartyrdom/
│   └── seo/
│       ├── MetaTags.astro
│       ├── SchemaOrg.astro
│       └── Sitemap.astro
├── content/
│   ├── faith-journey/        # Faith journey page content
│   ├── evidence/            # Evidence detail pages
│   │   ├── cosmological/
│   │   ├── biological/
│   │   ├── historical/
│   │   ├── supernatural/
│   │   └── witness/
│   └── config.ts             # Content collection schemas
├── layouts/
│   ├── BaseLayout/
│   └── EvidenceLayout/
├── pages/
│   ├── index.astro
│   ├── faith-journey/
│   │   └── index.astro
│   └── evidence/
│       ├── [category]/
│       │   └── [slug]/
│       └── index.astro
├── styles/
│   ├── global.css            # CSS variables for colors, typography
│   └── theme.module.css
└── utils/
    ├── seo.ts
    └── accessibility.ts
```

**Rationale:** Feature-based organization in `components/evidence/` maps directly to your 8 evidence categories. Content collections in `src/content/` with category grouping supports the mega-menu structure.

---

## 2. SEO Implementation

**Approach: Full static SEO stack**

### Sitemap
- Use `@astrojs/sitemap` integration
- Generate from content collections at build time
- Include `changefreq` and `priority` attributes for evidence pages

### Schema.org
- Implement `Person` schema for author (your faith journey)
- Implement `Article` schema for evidence pages
- Implement `FAQPage` schema for common questions
- Use `@astrojs/seo` package for meta tag management

### Meta Tags
- Dynamic title templates: `Evidence for [Topic] | Evidence of Christ`
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs for all pages
- Descriptive meta descriptions per page (155-160 characters)

### Additional SEO Considerations
- `robots.txt` with proper directives
- JSON-LD structured data for breadcrumb navigation
- Semantic HTML5 structure (header, main, nav, article, footer)
- Internal linking strategy between related evidence pages

---

## 3. Component Architecture

**Based on @vibing/rules/astro.js/astro-component-guidelines.md**

### Hydration Strategy
- **Zero JS by default**: All pages render as static HTML
- **client:idle**: Mega-menu dropdowns (if any interactivity needed)
- **client:visible**: Any scroll-triggered animations for evidence cards

### Core Components

| Component | Purpose | Hydration |
|-----------|---------|-----------|
| MegaMenu | Evidence categories with grouping | `client:idle` |
| EvidenceCard | Reusable card for each evidence topic | None (static) |
| Callout | Highlighted quotes and key points | None (static) |
| ResourceLink | Styled external links with icons | None (static) |
| Breadcrumb | Navigation breadcrumb | None (static) |
| SkipLink | Accessibility skip to content | None (static) |

### Layout Components
- **BaseLayout**: Wraps all pages, includes `<head>` SEO
- **EvidenceLayout**: Specialized for evidence detail pages with table of contents

### CSS Architecture
- CSS Modules (`*.module.css`) for component-scoped styles per @vibing/rules
- Global CSS variables for the color palette:
  ```css
  :root {
    --color-burgundy: #722F37;
    --color-cream: #F5F1E8;
    --color-gold: #C9A227;
    --font-serif: 'Merriweather', Georgia, serif;
    --font-ui: 'Inter', system-ui, sans-serif;
    --max-prose-width: 720px;
  }
  ```

---

## 4. Content Organization

**Recommendation: Content Collections with MDX**

### Why Content Collections
- Type-safe frontmatter with Zod schemas
- Built-in markdown rendering
- Collection-level data fetching for mega-menu

### Schema Structure (src/content/config.ts)
```typescript
import { defineCollection, z } from 'astro:content';

const evidenceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.enum(['cosmological', 'biological', 'historical', 'supernatural', 'witness']),
    order: z.number(),
    externalResources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      description: z.string().optional()
    })).optional(),
    lastUpdated: z.date()
  })
});

const faithJourneyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    stage: z.enum(['atheist', 'agnostic', 'believer']),
    order: z.number()
  })
});
```

### Category Grouping
Organize evidence pages under categories that map to your mega-menu:

| Category | Evidence Topics |
|----------|-----------------|
| Cosmological | Fine-tuned universe, Big Bang |
| Biological | DNA evidence |
| Historical | Manuscript evidence, Dead Sea Scrolls, Prophetic probability |
| Gospel | Gospel "inconsistencies", Flawed Bible heroes |
| Supernatural | Eucharistic miracles, Incorruptible saints |
| Witness | Apostle martyrdom |

### MDX Usage
Use MDX for evidence pages when you need:
- Custom components inside content (e.g., `<Callout>`, `<Statistic>`)
- Embedding video content
- Interactive elements

For static content, standard Markdown in content collections is sufficient.

---

## 5. Performance Considerations

### Static Generation
- Use `output: 'static'` (default) — all pages pre-rendered at build time
- No server-side rendering needed for this content

### Image Optimization
- Use `@astrojs/image` (built-in) for optimized images
- Implement responsive images with `srcset`
- Lazy loading for below-fold images
- Specify dimensions to prevent layout shift (CLS)

### Font Loading
- Self-host Merriweather and Inter using `@fontsource` packages
- Use `font-display: swap` for text visibility
- Preload critical font weights

### Bundle Optimization
- Minimal JavaScript — Astro ships zero JS by default
- If mega-menu needs interactivity, isolate to single island
- CSS purging built into Astro's build process

### Core Web Vitals Targets
- **LCP**: < 2.5s — Static HTML + optimized fonts achieves this easily
- **FID/INP**: < 100ms — Zero JS approach ensures near-instant
- **CLS**: < 0.1 — Specify image dimensions, use CSS containment

---

## 6. Deployment Recommendations

### Hosting Platform
**Recommended: Vercel or Netlify**

Both offer:
- Native Astro support
- Automatic deployments from git
- Edge network distribution
- Free tier suitable for static sites
- Custom domain with SSL

### Build Configuration
```bash
# npm scripts (package.json)
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

### Deployment Pipeline
1. **Development**: Local `npm run dev`
2. **Preview**: Netlify/Vercel preview deployments on PRs
3. **Production**: Auto-deploy on merge to main

### Environment
- No server-side environment variables needed (static site)
- If analytics needed, use privacy-friendly option (Plausible, Fathom)
- No database required — content is file-based

---

## 7. Accessibility (WCAG 2.1 AA)

Per @vibing/rules/common/ui/ui-accessibility-guidelines.md:

### Color Contrast
Your palette requires verification:
- Burgundy (#722F37) on cream: ~8.5:1 ✓ (exceeds 4.5:1)
- Gold (#C9A227) on cream: ~3.8:1 (needs verification on actual backgrounds)
- Test all text/background combinations

### Implementation Requirements
- **Skip link**: First focusable element, jumps to main content
- **Heading hierarchy**: h1 → h2 → h3 structure per page
- **Focus indicators**: Visible focus states on all interactive elements
- **Keyboard navigation**: Full keyboard access for mega-menu
- **Link text**: Descriptive ("Read about DNA evidence") not generic ("click here")
- **Touch targets**: Minimum 44×44px for interactive elements
- **Reduced motion**: Respect `prefers-reduced-motion` for any animations

### Testing Strategy
- Automated: axe-core, Lighthouse accessibility audit
- Manual: Keyboard-only navigation, screen reader testing (NVDA/VoiceOver)

---

## Summary

| Area | Recommendation |
|------|----------------|
| Structure | Feature-based with content collections |
| SEO | Full static stack: sitemap, schema.org, meta tags |
| Components | Zero-JS by default, islands only where needed |
| Content | MDX with typed frontmatter schemas |
| Performance | Static generation, optimized fonts, minimal JS |
| Deployment | Vercel/Netlify with auto-deploy |
| Accessibility | WCAG 2.1 AA from the start |

---

## Vibing Rules Referenced

- @vibing/rules/astro.js/astro-project-structure.md
- @vibing/rules/astro.js/astro-component-guidelines.md
- @vibing/rules/common/ui/ui-project-structure.md
- @vibing/rules/common/ui/ui-accessibility-guidelines.md
