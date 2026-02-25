# 05 - Frontend Architecture

**Purpose**: This document outlines the specific architecture for the frontend application, including component structure, state management strategy, UI framework conventions, key libraries, and development patterns.

## 1. Core Frameworks & Libraries

**Technology Stack** (per @vibing/rules):

- **Framework**: Astro 5.17.1 (server-first static site generation)
- **Language**: TypeScript 5.0+ (enforced by @vibing/rules/common/foundation/typescript-guidelines.md)
- **UI Component Library**: Foundation components (per @vibing/rules/common/ui/ui-foundational-component-principles.md)
- **State Management**: Service-Repository pattern via Astro Content Collections
- **Content**: Astro Content Collections with frontmatter organization
- **Styling**: CSS Modules with design token system (per @vibing/rules/common/ui/ui-styling-guidelines.md)
- **Testing**: E2E > Integration > Unit (per @vibing/rules/common/testing/test-general.md)

**Project-Specific Customizations**:

- Astro Content Collections for evidence/concepts management
- Frontmatter-driven content organization for expandability
- Static site generation (SSG) for optimal performance

## 2. Directory Structure

**Current Structure** (per @vibing/rules):

```
/src
├── /components/           # Reusable UI Components
│   ├── /foundation/       # Base UI building blocks
│   │   ├── /Button/
│   │   ├── /Card/
│   │   ├── /Callout/
│   │   └── /Icon/
│   └── /layout/           # Layout components
│       ├── /Header/
│       └── /Footer/
├── /content/              # Content Collections
│   └── /evidence/         # Evidence articles with frontmatter
├── /layouts/              # Page layouts
├── /pages/                # Route pages
│   └── /evidence/         # Evidence category pages
├── /styles/               # Global styles, tokens
│   └── global.css         # Design tokens and base styles
└── /utils/                # Utility functions
```

## 3. Component Architecture

**Component Hierarchy** (per @vibing/rules):

- **Foundation Components**: Smallest, indivisible UI elements
  - Located in `/components/foundation/`
  - Examples: `Button`, `Card`, `Callout`, `Icon`
  - Structure: `index.astro` + `styles.module.css`

- **Layout Components**: Structural components
  - Located in `/components/layout/`
  - Examples: `Header`, `Sidebar`, `Footer`
  - Handles site-wide navigation and branding

- **Feature Components**: Content-specific components
  - Located in relevant `/pages/` directories
  - Compose foundation and layout components
  - Handle content display and user interactions

- **Page Components**: Top-level route components
  - Located in `/pages/`
  - Compose features into complete pages
  - Handle routing and content queries

**Component Rules** (enforced by @vibing/rules):

- Single responsibility principle
- CSS Modules for styling
- TypeScript for all props
- Accessibility compliance (WCAG 2.1 AA)

## 4. State Management Strategy

**Content-Driven Architecture**:

- **Local State**: Astro component props and slots for component-level state
- **Content State**: Astro Content Collections with frontmatter queries
  - Collection schema defined in `/src/content/config.ts`
  - Access via `getCollection()` function
  - Sorting and filtering via utility functions

- **URL State**: Dynamic routing with slug-based navigation
  - Example: `/evidence/[slug].astro` for detail pages

**State Rules**:

- Content is statically generated at build time
- Client-side state limited to user preferences
- No external API calls (content-first approach)

## 5. SEO Requirements

- **Meta Tags**: Dynamic title/description from frontmatter
- **Structured Data**: JSON-LD for article content
- **SSR/SSG**: Full static generation for optimal SEO
- **Semantic HTML**: Proper heading hierarchy, article/article section tags
- **Open Graph**: Social sharing metadata

## 6. Performance Strategy

- Static site generation for fast initial load
- CSS Modules for scoped, minimal CSS
- Image optimization via Astro assets
- Font optimization via @fontsource packages
- Minimal JavaScript (Astro island architecture for interactive components)
