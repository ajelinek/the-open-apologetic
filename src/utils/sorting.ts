import type { CollectionEntry } from 'astro:content';

/**
 * Extract numeric order from filename (e.g., "1000_title.md" -> 1000)
 */
function getFileOrder(entry: { id: string }): number {
  const filename = entry.id.split('/').pop() ?? '';
  const match = filename.match(/^(\d+)_/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Sort content collection entries by their filename prefix in ascending order
 */
export function sortByOrder<T extends { id: string }>(entries: T[]): T[] {
  return entries.sort((a, b) => getFileOrder(a) - getFileOrder(b));
}

/**
 * Filter and sort content collection entries by category
 */
export function filterAndSortByCategory<T extends CollectionEntry<'evidence'>>(
  entries: T[],
  category: string
): T[] {
  return sortByOrder(entries.filter((entry) => entry.data.category === category));
}
