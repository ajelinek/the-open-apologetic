# 07 - UI Experience Overview

**Purpose**: Establishes high-level user experience architecture and cross-cutting interaction patterns.

## 1. Navigation & Interaction Patterns

- **Navigation Approach**: Hybrid navigation - persistent header with logo + primary links + hamburger menu for mobile/secondary items
- **Cross-Platform Patterns**: 
  - Desktop: Full header navigation with horizontal menu
  - Mobile: Hamburger menu with slide-out panel from right
- **Contextual Navigation**: 
  - Breadcrumb trail on detail pages (Evidence > Category > Topic)
  - Related content links at bottom of detail pages
  - Category filtering on evidence index page

- **Core Interactions**:
  - Navigation: Click to route, smooth scroll for anchors
  - Content: Card click opens detail page, category tabs filter content
  - Feedback: Hover states on all interactive elements, loading states for content
  - Forms: None currently (static content site)

- **Accessibility**: 
  - Skip-to-content link
  - Proper heading hierarchy (h1 → h2 → h3)
  - Focus-visible states on all interactive elements
  - Keyboard navigation support throughout
  - Semantic HTML (nav, main, article, section)

- **Error Handling**: 
  - 404 page for missing content
  - Build-time validation of content frontmatter
  - Graceful degradation for missing optional fields

## 2. Page Summary

| Page Name | Route | Description |
| --------- | ----- | ----------- |
| Home | `/` | Hero section, featured evidence cards, faith journey overview, CTA to explore |
| Evidence Index | `/evidence` | All evidence grouped by category (Scientific, Historical, Catholic) |
| Evidence Detail | `/evidence/[slug]` | Full article content with external resources, related topics |
| 404 | `/*` | Not found page with navigation back to home |

## 3. Content Organization (Frontmatter)

The site uses Astro Content Collections with frontmatter for content management:

**Evidence Collection Schema**:
- `title`: String - Article title
- `description`: String - Brief summary for cards
- `category`: Enum - 'scientific' | 'historical' | 'catholic'
- `order`: Number - Display ordering within category
- `icon`: String - Unicode icon for visual identification
- `externalResources`: Array - Books, videos, articles, websites

**Expandability**:
- Add new `.md` files to `/src/content/evidence/`
- Define frontmatter following schema
- Automatic categorization and sorting
- No code changes required for new content
