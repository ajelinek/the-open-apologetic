# The Open Apologetic

A website presenting evidence for Catholic Christianity through scientific, historical, and miraculous evidence.

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [pnpm](https://pnpm.io) - Package manager
- Content Collections - Markdown-based content management

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start development server at localhost:4321 |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |

## Project Structure

```
src/
├── content/
│   ├── config.ts              # Content collection schemas
│   └── evidence/              # Evidence markdown files
│       ├── fine-tuned-universe.md
│       ├── big-bang.md
│       └── ... (11 total)
├── pages/
│   ├── evidence/
│   │   ├── [slug].astro      # Dynamic evidence page
│   │   └── index.astro       # Evidence listing
│   └── index.astro           # Home page
├── components/               # Reusable UI components
└── layouts/                  # Page layouts
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on adding new evidence pages via markdown.

## License

GNU General Public License v3 (GPLv3)
