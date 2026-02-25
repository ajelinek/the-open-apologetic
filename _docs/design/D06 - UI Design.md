# 06 - UI Design

**Purpose**: This document establishes the strategic design decisions and visual system principles for the application.

## 1. Design Strategy & Brand Foundation

- **Brand Personality**: Academic, trustworthy, reverent yet approachable - balancing scholarly credibility with spiritual warmth
- **Design Philosophy**: Content-first design with clear visual hierarchy, generous whitespace, and purposeful typography that invites exploration
- **Accessibility Strategy**: WCAG 2.1 AA compliance with high contrast text, clear focus states, keyboard navigation, and screen reader support
- **Responsive Philosophy**: Mobile-first with progressive enhancement for larger screens - ensuring content is accessible on all devices

## 2. Color Strategy

### Color Philosophy

- **Primary Color Strategy**: Deep burgundy as anchor color conveying tradition, depth, and spiritual significance
- **Semantic Color System**: Gold accents for emphasis and CTAs, cream backgrounds for warmth and readability
- **Accessibility Requirements**: 4.5:1 minimum contrast for body text, 3:1 for large text
- **Theme Support**: Single light theme (cream/burgundy/gold) - no dark mode initially

### Color Palette

**Brand Colors**:
- Burgundy Primary: `#722F37` (headers, primary actions)
- Burgundy Light: `#8a3f47` (hover states)
- Burgundy Dark: `#5a252c` (active states)

- Gold Accent: `#C9A227` (CTAs, highlights, borders)
- Gold Light: `#d4b33d` (hover)
- Gold Dark: `#a8871f` (active)

- Cream Background: `#F5F1E8` (primary background - warm, paper-like)
- Cream Light: `#faf8f3` (cards, surfaces)
- Cream Dark: `#ebe5d8` (borders, dividers)

**Semantic Colors**:
- Warning: `#d97706` border with `#fef3c7` background
- Success/Info: Use gold accent variants

**Neutral Palette**:
- Text Primary: `#2c2c2c`
- Text Secondary: `#555555`
- Text Muted: `#777777`

## 3. Typography Strategy

### Typography Philosophy

- **Font Selection Strategy**: Serif for headings and body (Merriweather) conveys authority and tradition; sans-serif for UI elements (Inter) ensures readability
- **Hierarchy Philosophy**: Clear size differentiation (4xl for h1, 3xl for h2, 2xl for h3) with consistent spacing scale
- **Readability Standards**: 1.7 line-height for body text, max 720px prose width for optimal reading

### Font System

- **Primary Font (Serif)**: Merriweather 400/700 - headings, body text, quotes
- **Secondary Font (UI)**: Inter 400/600 - navigation, buttons, labels, metadata
- **Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px

## 4. Layout & Component Strategy

### Layout & Spacing

- **Grid System**: CSS Grid for page layouts, Flexbox for components
- **Spacing Scale**: 4px base unit (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem)
- **Content Density**: Generous whitespace - comfortable reading experience over compact density
- **Responsive Strategy**: 
  - Mobile: Single column, hamburger menu
  - Tablet: Two-column grids where appropriate
  - Desktop: Full layout with max-width 1200px

### Component Design

- **Card Design (Updated)**:
  - Expandable structure for content flexibility
  - Clear visual hierarchy with icon → title → excerpt → metadata
  - Gold left border accent for brand recognition
  - Subtle hover lift effect
  - Slot-based content allowing variable information density

- **Button Design**: 
  - Primary (burgundy), Secondary (outline), Gold (accent CTAs)
  - Clear hover/active states with color transitions

- **Callout Design**: 
  - Quote, warning, and info variants
  - Distinct left border treatment
  - Icon support for visual categorization

### Visual Assets

- **Icon Strategy**: Unicode emoji icons for topic categorization (🌌 📚 🔬 ✝️) - lightweight, universally supported
- **Imaginary**: Not initially required - content is text-focused
- **Performance**: SVG icons inline for critical UI, emoji for content categories

### Motion & Interaction

- **Animation Purpose**: Subtle feedback on interactions (hover lift, color transitions)
- **Performance**: CSS transitions only, 150-250ms duration
- **Accessibility**: Respect `prefers-reduced-motion` media query
- **Focus States**: 2px gold outline with 2px offset for keyboard navigation
