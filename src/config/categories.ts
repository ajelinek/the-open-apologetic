/**
 * Category configuration for Evidence and Stories sections
 * This file exports centralized category definitions to avoid duplication
 */

import type { Category } from '../types/shared';

/**
 * Evidence categories with metadata
 */
export const EVIDENCE_CATEGORIES: Category[] = [
  { id: 'scientific', label: 'Scientific Evidence' },
  { id: 'historical', label: 'Historical Evidence' },
  { id: 'biblical', label: 'Biblical Evidence' },
  { id: 'philosophy', label: 'Philosophy & Apologetics' },
  { id: 'doctrine', label: 'Catholic Doctrine' }
];

/**
 * Stories categories
 */
export const STORIES_CATEGORIES: Category[] = [
  { id: 'testimonies', label: 'Testimonies' },
  { id: 'miracles', label: 'Miracles' }
];

/**
 * Evidence category descriptions
 */
export const EVIDENCE_DESCRIPTIONS: Record<string, string> = {
  scientific: 'Evidence from science that points toward the existence of God and the design of the universe.',
  historical: 'Historical facts and archaeological discoveries that support the credibility of the Bible and Christianity.',
  biblical: 'Internal biblical evidence including manuscript accuracy, prophecies, and textual analysis.',
  philosophy: 'Philosophical arguments for God\'s existence and responses to common objections against faith.',
  doctrine: 'Supernatural occurrences and teachings that attest to the truth of Catholic doctrine and the intercession of saints.'
};
