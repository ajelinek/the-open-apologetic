# Contributing to Evidence for Christ

Thank you for your interest in contributing! This guide explains how to add new evidence pages to the site using markdown content collections.

## Adding New Evidence Pages

### 1. Create a Markdown File

Create a new `.md` file in `src/content/evidence/`:

```bash
# Example: src/content/evidence/my-new-topic.md
```

### 2. Add Frontmatter

Every evidence page must include frontmatter with the following fields:

```yaml
---
title: "The Fine-Tuned Universe"           # Required: Display title
description: "A brief description..."      # Required: Shown in cards and meta
category: "scientific"                      # Required: scientific | historical | catholic
order: 1                                   # Required: Display order within category
icon: "🌌"                                 # Optional: Emoji icon for cards
externalResources:                         # Optional: External links
  - title: "Book Title"
    url: "https://example.com"
    type: "book"                           # Optional: book | video | article | website
---
```

### 3. Write Content

Add your markdown content after the frontmatter. You can use:

- **Headers** (##, ###)
- **Paragraphs**
- **Lists** (ordered and unordered)
- **Quotes** (>)
- **Bold** and *italic* text
- **Links** and images
- **Callouts** using :::info, :::quote, or :::warning

#### Using Callouts

```markdown
:::info
This is an info box for important notes.
:::

:::quote
This is a quote block for notable quotations.
:::

:::warning
This is a warning box for cautions.
:::
```

### 4. Category Guidelines

- **scientific**: Cosmological, biological, or scientific evidence for faith
- **historical**: Historical, archaeological, or biblical evidence
- **catholic**: Catholic-specific miracles, traditions, or teachings

### 5. External Resources

Add helpful external resources in the frontmatter:

```yaml
externalResources:
  - title: "Recommended Book"
    url: "https://amazon.com/..."
    type: "book"
  - title: "Video Lecture"
    url: "https://youtube.com/..."
    type: "video"
  - title: "Related Article"
    url: "https://example.com/..."
    type: "article"
```

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── content/
│   ├── config.ts          # Content collection schemas
│   └── evidence/          # Evidence markdown files
│       ├── fine-tuned-universe.md
│       ├── big-bang.md
│       └── ...
├── pages/
│   ├── evidence/
│   │   ├── [slug].astro   # Dynamic evidence page template
│   │   └── index.astro    # Evidence listing page
│   └── index.astro        # Home page
└── components/            # Reusable UI components
```

## Questions?

If you have questions about contributing, please open an issue on GitHub.
